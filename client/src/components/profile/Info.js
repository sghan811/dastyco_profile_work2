import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import MessageBtn from "../MessageBtn";
import Following from "./Following";
import Followers from "./Followers";
import ChangePassword from "./ChangePassword";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div>
          <div className="profile_head">

              <div
                className="profile_img"
              >
                <Avatar src={user.avatar} size="supper-avatar"/>
            </div>
          </div>
          <div key={user._id} className="info_container">
            <div className="pad">
            </div>
            <div className="info_content">
              <div className="info_content_title">
              <h2>{user.username}</h2>
                <div className="follow_btn_main">
                  <div className="follow_btn">
                    <span className="mr-4 followers_button" onClick={() => setShowFollowers(true)}>
                      {user.followers.length} Followers
                    </span>
                  </div>
                  <div className="follow_btn">
                    <span className="ml-4 following_button" onClick={() => setShowFollowing(true)}>
                      {user.following.length} Following
                    </span>   
                  </div>
                </div>
              <h6>
                {user.fullname}{" "}
                <span className="color-violet">{user.mobile}</span>
              </h6>
              <p className="m-0">{user.address}</p>
              <h6>{user.email}</h6>
              <a
                style={{ textDecoration: "none" }}
                href={user.website}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
              <p>{user.story}</p>
              <div className="buttons">
                {user._id === auth.user._id ? (
                    <button onClick={() => setOnEdit(true)}>
                      Edit Profile
                    </button>
                  ) : (
                    <FollowBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    <button onClick={() => setChangePassword(true)}>
                      change password
                    </button>
                  ) : (
                    <MessageBtn user={user} />
                  )}
                  {user._id === auth.user._id ? (
                    <button>
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </Link>
                    </button>
                  ) : (
                    <></>
                )}
              </div>
            </div>
            </div>
            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            {changePassword && (
              <ChangePassword setChangePassword={setChangePassword} />
            )}

            {showFollowers && (
              <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
            {showFollowing && (
              <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
