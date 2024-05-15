import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyProfile } from '../../services/apiCalls.js'; 
import Spinner from '../../components/Spinner/Spinner.jsx';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile(token);
        if (profileData.email) {
          setProfile({
            name: profileData.name,
            email: profileData.email,
            avatar: profileData.avatar,
            biography: profileData.biography,
            socialNetwork: profileData.socialNetwork,
          });
        } else {
          throw new Error("Failed to load user profile");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error("No authentication token found.");
    }
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {userProfile ? (
          <>
            <img className="w-48 h-48 rounded-full mx-auto" src={userProfile.avatar} alt="Profile picture" />
            <h2 className="text-center text-2xl font-semibold mt-3">{userProfile.name}</h2>
            <p className="text-center text-gray-600 mt-1">{userProfile.email}</p>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">About the artist </h3>
              <p className="text-gray-600 mt-2">{userProfile.biography}</p>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">Social Network</h3>
              <div className="flex justify-center mt-2 space-x-4">
                {userProfile.socialNetwork && userProfile.socialNetwork.twitter && (
                  <a href={userProfile.socialNetwork.twitter} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
                {userProfile.socialNetwork && userProfile.socialNetwork.linkedIn && (
                  <a href={userProfile.socialNetwork.linkedIn} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {userProfile.socialNetwork && userProfile.socialNetwork.github && (
                  <a href={userProfile.socialNetwork.github} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Profile;
