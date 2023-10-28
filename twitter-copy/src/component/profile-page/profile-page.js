import React, {useState} from "react";

import img from '../../assets/azikkw original.JPG'

const profile = {
    'img': img,
    'fname': 'Azat',
    'lname': 'Amen',
    'birth': '15.02.2003',
    'email': 'azat.amenov@gmail.com',
    'password': 'password'
}

const ProfilePage = () => {

    const [profile, setProfile] = useState(
        {fname: 'Azat', lname: 'Amen', birth: "15.02.2003", email: "a_amen@kbtu.kz", password: "pass"},
    )

    return <div>
        <div style={{fontSize: '30px', marginBottom: "20px", fontWeight: "500"}}>Profile</div>
        <div style={{display: 'flex'}}>
            <div className={"avatar"}>
                <img src={img} alt={img} style={{width: '300px', height: '300px', borderRadius: '50%', marginRight: "50px"}} />
            </div>
            <div className={"info"}>
                <input placeholder={profile.fname} className={"fname"} />
                <input placeholder={profile.lname} className={"lname"} />
                <input placeholder={profile.birth} className={"birth"} />
                <input placeholder={profile.email} className={"email"} />
                <input placeholder={profile.password} className={"password"} />
                <button type="submit">Change</button>
            </div>
        </div>
    </div>
}

export default ProfilePage;