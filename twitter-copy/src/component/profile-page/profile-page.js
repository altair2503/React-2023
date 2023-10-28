import React from "react";

const profile = {
    'fname': 'Azat',
    'lname': 'Amen',
    'birth': '15.02.2003',
    'email': 'azat.amenov@gmail.com',
    'password': 'password'
}

const ProfilePage = () => {
    return <div>
        <div className={"avatar"}>
            {/*<img src={} alt={}/>*/}
        </div>
        <div className={"info"}>
            <input placeholder={profile.fname} />
            <input placeholder={profile.lname} />
            <input placeholder={profile.birth} />
            <input placeholder={profile.email} />
            <input placeholder={profile.password} />
        </div>
    </div>
}

export default ProfilePage;