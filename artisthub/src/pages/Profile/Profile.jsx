import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyProfile, updateUserProfile } from '../../services/apiCalls.js'; 
import Spinner from '../../components/Spinner/Spinner.jsx';


// const Profile = () => {
//   const [userProfile, setProfile] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     nick: '',
//     avatar: null
//   });
//   const token = useSelector((state) => state.user.token);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getMyProfile(token);
//         console.log('Fetched Profile Data:', profileData); // Log the fetched profile data
//         if (profileData.email) {
//           setProfile(profileData);
//           setFormData({
//             name: profileData.name,
//             nick: profileData.nick,
//             avatar: null
//           });
//         } else {
//           throw new Error("Failed to load user profile");
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error.message);
//       }
//     };

//     if (token) {
//       fetchProfile();
//     } else {
//       console.error("No authentication token found.");
//     }
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAvatarChange = (e) => {
//     setFormData({ ...formData, avatar: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updateData = new FormData();
//       updateData.append('name', formData.name);
//       updateData.append('nick', formData.nick);
//       if (formData.avatar) {
//         updateData.append('image', formData.avatar);
//       }

//       console.log('FormData to be sent:');
//       for (let pair of updateData.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//       }

//       if (userProfile && userProfile._id) {
//         const userId = userProfile._id; // Asegúrate de que el ID del usuario está presente
//         console.log('User ID:', userId); // Log the user ID
//         const response = await updateUserProfile(token, userId, updateData);
//         console.log('Update response:', response); // Log the response from updateUserProfile
//         setProfile(response.user);
//         setEditMode(false);
//       } else {
//         throw new Error("User ID is not available");
//       }
//     } catch (error) {
//       console.error('Update failed:', error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-6xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
//         {userProfile ? (
//           editMode ? (
//             <form onSubmit={handleSubmit}>
//               <div className="text-center">
//                 <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatar-upload" />
//                 <label htmlFor="avatar-upload">
//                   <img
//                     className="w-48 h-48 rounded-full mx-auto cursor-pointer"
//                     src={formData.avatar ? URL.createObjectURL(formData.avatar) : userProfile.avatar}
//                     alt="Profile avatar"
//                   />
//                 </label>
//               </div>
//               <div className="mt-5">
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mt-5">
//                 <label className="block text-gray-700">Nick</label>
//                 <input
//                   type="text"
//                   name="nick"
//                   value={formData.nick}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mt-5 text-center">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                   Save
//                 </button>
//                 <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <>
//               <img className="w-48 h-48 rounded-full mx-auto cursor-pointer" src={userProfile.avatar} alt="Profile picture" onClick={() => setEditMode(true)} />
//               <h2 className="text-center text-2xl font-semibold mt-3">{userProfile.name}</h2>
//               <p className="text-center text-gray-600 mt-1">{userProfile.email}</p>
//               <div className="mt-5 text-center">
//                 <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
//                   Edit Profile
//                 </button>
//               </div>
//             </>
//           )
//         ) : (
//           <Spinner />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nick: '',
    biography: '',
    avatar: null
  });
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile(token);
        console.log('Fetched Profile Data:', profileData); // Log the fetched profile data
        if (profileData.email) {
          setProfile(profileData);
          setFormData({
            name: profileData.name,
            nick: profileData.nick,
            biography: profileData.biography,
            avatar: null
          });
        } else {
          throw new Error("Failed to load user profile");
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      console.error("No authentication token found.");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('nick', formData.nick);
      updateData.append('biography', formData.biography);
      if (formData.avatar) {
        updateData.append('image', formData.avatar);
      }

      console.log('FormData to be sent:');
      for (let pair of updateData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      if (userProfile && userProfile._id) {
        const userId = userProfile._id; // Asegúrate de que el ID del usuario está presente
        console.log('User ID:', userId); // Log the user ID
        const response = await updateUserProfile(token, userId, updateData);
        console.log('Update response:', response); // Log the response from updateUserProfile
        setProfile(response.user);
        setEditMode(false);
      } else {
        throw new Error("User ID is not available");
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {userProfile ? (
          editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatar-upload" />
                <label htmlFor="avatar-upload">
                  <img
                    className="w-48 h-48 rounded-full mx-auto cursor-pointer"
                    src={formData.avatar ? URL.createObjectURL(formData.avatar) : userProfile.avatar}
                    alt="Profile avatar"
                  />
                </label>
              </div>
              <div className="mt-5">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-5">
                <label className="block text-gray-700">Nick</label>
                <input
                  type="text"
                  name="nick"
                  value={formData.nick}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-5">
                <label className="block text-gray-700">Biography</label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-5 text-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <img className="w-48 h-48 rounded-full mx-auto cursor-pointer" src={userProfile.avatar} alt="Profile picture" onClick={() => setEditMode(true)} />
              <h2 className="text-center text-2xl font-semibold mt-3">{userProfile.name}</h2>
              <p className="text-center text-gray-600 mt-1">{userProfile.nick}</p>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">About the artist</h3>
                <p className="text-gray-600 mt-2">{userProfile.biography}</p>
              </div>
              <div className="mt-5 text-center">
                <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Edit Profile
                </button>
              </div>
            </>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Profile;