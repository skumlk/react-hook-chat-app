import React from "react";

function useChatHook(user1_id) {
    const { user: { uid: user2_id } } = useFirebaseAuth();
    const [data, setData] = useState([])

    if (user1_id < user2_id) [user1_id, user2_id] = [user2_id, user1_id];

    useEffect(() => {
        const unsubscribe = db.collection("chats")
            .doc(`${user1_id}#${user2_id}`)
            .collection("messages")
            .orderBy("created")
            .onSnapshot((query_snapshot) => {
                query_snapshot.docChanges().forEach(function (change) {

                    if (change.type === "added") {
                        const new_doc = change.doc.data();
                        const key = change.doc.id;
                        setData((data) => [...data, { key, ...new_doc }]);
                    }

                    if (change.type === "modified") {
                        const new_doc = change.doc.data();
                        const key = change.doc.id;
                        setData((data) => {
                            const index = data.findIndex((x) => x.key === key);
                            const result = [...data]
                            result[index] = { key, ...new_doc }
                            return result;
                        });
                    }

                });
            });

        return () => { setData([]), unsubscribe() }
    }, [])

    return { data }
}

export { useChatHook };


