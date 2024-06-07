import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser);

    let avatarName = "";

    if (name) {
        const splitName = name.split(" ");

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-cyan-200',
        'bg-sky-200',
        'bg-blue-200'
    ];

    const hashCode = (str) => {
        return str.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
    };

    const getColorFromHash = (str) => {
        const index = Math.abs(hashCode(str)) % bgColor.length;
        return bgColor[index];
    };

    const isOnline = onlineUser.includes(userId);

    return (
        <div className={`text-slate-800 rounded-full font-bold relative`} style={{ width: width + "px", height: height + "px" }}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={name}
                    style={{ width: width + "px", height: height + "px" }}
                    className='object-cover rounded-full'
                />
            ) : (
                name ? (
                    <div style={{ width: width + "px", height: height + "px" }} className={`flex justify-center items-center text-lg ${getColorFromHash(name)} rounded-full`}>
                        {avatarName}
                    </div>
                ) : (
                    <PiUserCircle
                        size={width}
                    />
                )
            )}

            {isOnline && (
                <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
            )}
        </div>
    )
}

export default Avatar;
