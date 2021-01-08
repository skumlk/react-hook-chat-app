import { Button, Input } from '@chakra-ui/react'
import { AuthUserThumb } from 'components/User/UserThumb'
import React, { useState } from 'react'
import { useAuth } from 'services/auth'
import { ShowError, validateEmail } from "utils/main"
import * as _ from "lodash"

function UserProfile() {
    const { user, updateProfile } = useAuth()
    const [isEditable, setEditable] = useState(false)
    const [editUser, setEditUser] = useState({})
    const [error, setError] = useState({})

    function saveChanges() {
        if (!editUser.name)
            setError(error => ({ ...error, name: "Name field is required" }))

        if (!editUser.email)
            setError(error => ({ ...error, email: "Email field is required" }))
        else if (!validateEmail(editUser.email))
            setError(error => ({ ...error, email: "Invalid email address" }))

        if (!_.isEmpty(error)) return

        updateProfile.mutate(editUser, {
            onSuccess: (data, variables, context) => {
                setEditable(false)
            },
            onError: (error) => {
                setError({"failedToSave" : "Failed to update"})
            }
        })
    }

    function onInputChange(data) {
        setEditUser(user => ({ ...user, ...data }))
        setError({})
    }

    function makeEditable() {
        setEditUser({ name: user.displayName, email: user.email })
        setEditable(true)
    }

    return (
        <div className="bg-gray-200 p-4 max-h-full min-h-0 flex-grow">
            <div className="bg-white min-w-max mx-28 mt-10 p-8 flex">
                <div className="mr-4" >
                    <AuthUserThumb size="large" />
                </div>
                <div className="flex flex-col">
                    {isEditable ?
                        <React.Fragment>
                            <ShowError error={error.failedToSave} />
                            <Input placeholder="Name" value={editUser?.name} onChange={(e) => onInputChange({ name: e.target.value })} />
                            <ShowError error={error.name} />
                            <Input placeholder="E-mail" value={editUser?.email} onChange={(e) => onInputChange({ email: e.target.value })} className="mt-2" />
                            <ShowError error={error.email} />
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="text-2xl capitalize">{user?.displayName}</div>
                            <div className="text-sm	">{user?.email}</div>
                        </React.Fragment>
                    }
                    <div className="flex-grow my-4"></div>
                    <div>
                        {isEditable ?
                            (<React.Fragment>
                                <Button className="mr-2" size="sm" colorScheme="blue" onClick={saveChanges}>
                                    Save Changes
                                </Button>
                                <Button className="mr-2" size="sm" colorScheme="blue" onClick={() => setEditable(false)}>
                                    Cancel
                                </Button>
                            </React.Fragment>) :
                            <Button className="mr-2" size="sm" colorScheme="blue" onClick={makeEditable}>
                                Edit Profile
                            </Button>
                        }
                        <Button size="sm" >Update Profile Picture</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
