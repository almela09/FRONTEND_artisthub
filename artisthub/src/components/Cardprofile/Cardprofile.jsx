import React from 'react';
import ProfileCard from './ProfileCard';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <ProfileCard
        imageUrl="https://picsum.photos/200"
        name="John Doe"
        title="Software Engineer"
        twitterUrl="#"
        linkedInUrl="#"
        gitHubUrl="#"
        bio="John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js."
      />
    </div>
  );
};

export default App;
