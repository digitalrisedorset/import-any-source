import {Form, Label} from "../../global/styles/Form";
import {UserDetailsData} from "@/pages/types/keystone"
import React from "react";
import {AccessState} from "@/pages/types/states";

type UserDetailsProps = {
    user: UserDetailsData
}

export const UserDetails: React.FC = ({user}: UserDetailsProps) => {
    const getUserAcess = (userRole: AccessState) => {
        if (typeof userRole !== 'object') {
            return 'no access'
        }

        const userRoleActive = Object.entries(userRole).filter((item: any) => (item[1]===true)).map(item => {
            return item[0]
        })

        return userRoleActive.join()
    }

    return (
        <Form data-testid="loggedInUser">
            <h2>Your details</h2>
            <fieldset>
                <Label htmlFor="name">Your Name</Label>
                <input
                    type="text"
                    name="name"
                    value={user?.name}
                    disabled
                />
                <Label htmlFor="email">Your Email</Label>
                <input
                    type="text"
                    name="name"
                    value={user?.email}
                    disabled
                />

                <Label htmlFor="email">Your access</Label>
                <textarea
                    name="access"
                    value={getUserAcess(user?.role)}
                    disabled
                />
            </fieldset>
        </Form>
    )
}