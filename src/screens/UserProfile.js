import { Button } from '@chakra-ui/react'
import { AuthUserThumb } from 'components/User/UserThumb'
import React from 'react'
import { useAuth } from 'services/auth'

function UserProfile() {
    const { user } = useAuth()
    return (
        <div className="bg-gray-200 p-4 max-h-full min-h-0 flex-grow">
            <div className="bg-white min-w-max mx-28 mt-10 p-8 flex">
                <div className="mr-4" >
                    <AuthUserThumb size="large" />
                </div>
                <div className="flex flex-col">
                    <div className="text-2xl capitalize">{user?.displayName}</div>
                    <div className="text-sm	">{user?.email}</div>
                    <div className="flex-grow"></div>
                    <div>
                        <Button className="mr-2" size="sm" colorScheme="blue">Edit Profile</Button>
                        <Button size="sm" >Update Profile Picture</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
