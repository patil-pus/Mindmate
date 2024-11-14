
import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext'


export default function Feature({data}) {
const { user, updateUser } = useContext(UserContext);

  const handleUpdateUser = () => {
    // New data to update the user context
    const newUserData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    };
    console.log("Calling updateUser with:", newUserData); // Debug log
    updateUser(newUserData); // Update the context
  };

  console.log("Current user in Feature component:", user); // Debug log

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <p>
          Name: {user.name} <br />
          Email: {user.email}
        </p>
      ) : (
        <p>No user data available.</p>
      )}
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}