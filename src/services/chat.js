import firebase from "firebase";
import { useEffect, useState } from "react";
import { useFirebase } from "context/firebase/firebase-context";

const _sortByUpdated = (a, b) => (b.updated?.seconds ?? Infinity) - (a.updated?.seconds ?? Infinity)

function _handleSnapshotchanges(setData, change) {

    if (change.type === "added") {
        const new_doc = change.doc.data();
        const key = change.doc.id;
        setData((data) => {
            const result = [...data, { key, ...new_doc }]
            result.sort(_sortByUpdated)
            return result
        });
    }

    if (change.type === "modified") {
        const new_doc = change.doc.data();
        const key = change.doc.id;
        setData((data) => {
            const index = data.findIndex((x) => x.key === key);
            let result = [...data]
            result[index] = { key, ...new_doc }
            result.sort(_sortByUpdated)
            return result;
        });
    }
}

function _getChatCollectionName(user1_id, user2_id) {
    if (user1_id > user2_id) [user1_id, user2_id] = [user2_id, user1_id];
    return `${user1_id}#${user2_id}`;
}

function useChatHook(user1_id, user2_id) {
    const { firestore: db } = useFirebase();
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (!(user1_id && user2_id))
            return

        setLoading(true)
        let unsubscribe = undefined;
        async function subscribeChatAndCreateIfNotExist() {
            const collection_name = _getChatCollectionName(user1_id, user2_id)

            unsubscribe = db.collection("chats")
                .doc(collection_name)
                .collection("messages")
                .orderBy("created")
                .onSnapshot((query_snapshot) => {
                    if (query_snapshot.size === 0)
                        _sendChatMessage(db, user1_id, user2_id, "Welcome")

                    query_snapshot.docChanges().forEach(function (change) {
                        _handleSnapshotchanges(setData, change)
                    });
                });
        }

        subscribeChatAndCreateIfNotExist()
        return () => { setData([]); unsubscribe(); }
    }, [db, user1_id, user2_id])

    return { isLoading, data }
}

function useChatHistory(user_id) {
    const { firestore: db } = useFirebase();
    const [data, setData] = useState([])

    useEffect(() => {

        if (!user_id) return
        const unsubscribe = db
            .collection("chat_history")
            .doc(user_id)
            .collection("chats")
            .orderBy("updated")
            .onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach(function (change) {
                    _handleSnapshotchanges(setData, change)
                });
            });

        return () => { if (unsubscribe !== null) unsubscribe(); }
    }, [user_id, db]);

    return { data }
}

async function _sendChatMessage(db, user1_id, user2_id, message) {//user_1 send message to user2

    const chat_collection_name = _getChatCollectionName(user1_id, user2_id)
    const batch = db.batch();

    batch.set(
        db.collection("chat_history").doc(user1_id).collection("chats").doc(user2_id),
        {
            updated: firebase.firestore.FieldValue.serverTimestamp(),
            message,
            user: user2_id,
        },
        { merge: true }
    );

    batch.set(
        db.collection("chat_history").doc(user2_id).collection("chats").doc(user1_id),
        {
            updated: firebase.firestore.FieldValue.serverTimestamp(),
            message,
            user: user1_id,
        },
        { merge: true }
    );

    batch.set(
        db.collection("chats").doc(chat_collection_name).collection("messages").doc(),
        {
            created: firebase.firestore.FieldValue.serverTimestamp(),
            message,
            user: user1_id,
        }
    );

    await batch.commit();
}

function useChatApi() {
    const { firestore: db } = useFirebase();
    const sendChatMessage = (user1_id, user2_id, message) => _sendChatMessage(db, user1_id, user2_id, message)
    return { sendChatMessage }
}

export { useChatHook, useChatHistory, useChatApi };