import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ShineBorder from "@/components/ui/shine-border";
import DockDemo from "./DockDemo";

const Dashboard = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

      const clientId = sessionStorage.getItem('clientId');
      console.log("client id",clientId);
       if (!clientId) {
      //router.push('/SignIn');
      console.log("invalid client id"); 
      return;
    }

    const fetchDashboard = async() => {
    
      try{
      const res = await fetch(`http://localhost:8080/api/clients/${clientId}/getJournal`, {
        method: 'GET',
        credentials: 'include'
      });

      if(res.ok){
        const data = await res.json();
        setDashboard(data);
        console.log("dahsboard data - ",data);
    }else{
      console.error('Failed to fetch dashboard data');
    }
          //router.push('/SignIn');
    }
    catch(error){
      console.error('Error fetching dashboard data:', error);
    }
  };
  fetchDashboard();
  },[router]);
    
  return (
    <div>
      <ShineBorder
        className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
       
      >
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          {`Welcome to Your Dashboard`}
        </span>

          <div className="dashboard-content mt-6 text-center text-lg">
          {dashboard ? (
            <ul>
              {dashboard.map((entry, index) => (
                <li key={index}>{entry.content}</li> 
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="fixed bottom-0">
        <DockDemo/>
        </div>
      </ShineBorder>
    </div>
  );
};

export default Dashboard;
