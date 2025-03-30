import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
    
  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12.03125 1.5a1 1 0 00-.539062.138672l-9.5 5.587891a1 1 0 101.007812 1.726562V20a1 1 0 001 1h16a1 1 0 001-1V8.953125a1 1 0 101.007812-1.726562l-9.5-5.587891A1 1 0 0012.03125 1.5zM12 3.660156l7 4.117188V19h-3v-7a1 1 0 00-1-1H9a1 1 0 00-1 1v7H5V7.777344l7-4.117188zM10 13h4v6h-4v-6z" />
    </svg>
  );
  const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
  const SessionHistoryIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V12L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  );
  const FeedbackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
  
  const TherapistIcon = () => (
    <svg 
      fill="#000000" 
      className="w-5 h-5" 
      version="1.1" 
      id="Capa_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 449.412 449.412" 
      xmlSpace="preserve"
    >
<path id="XMLID_264_" d="M382.635,124.312l-20.171-15.946c-2.793-2.208-6.547-2.764-9.859-1.463l-26.769,10.518V75.109
	c0-3.058-1.399-5.948-3.798-7.845l-20.171-15.946c-2.793-2.208-6.548-2.764-9.859-1.463l-26.926,10.58v-34.49
	c0-3.059-1.399-5.948-3.799-7.845L241.112,2.155c-2.791-2.207-6.546-2.764-9.858-1.463l-40.583,15.945
	c-3.826,1.504-6.343,5.196-6.343,9.308v34.51l-26.978-10.6c-3.312-1.301-7.066-0.744-9.858,1.463L127.32,67.265
	c-2.398,1.896-3.798,4.786-3.798,7.845V117.4l-26.715-10.497c-3.313-1.301-7.067-0.745-9.858,1.463l-20.172,15.946
	c-2.398,1.896-3.798,4.787-3.798,7.845v181.76c0,0.099,0.012,0.194,0.015,0.292c0.178,32.55,11.751,63.063,33.406,87.28
	c27.235,30.456,68.408,47.923,112.962,47.923c36.694,0,72.453-11.214,103.41-32.43c30.115-20.64,53.253-49.688,65.148-81.792
	c8.101-21.858,8.512-35.594,8.512-56.195V132.157C386.433,129.1,385.033,126.209,382.635,124.312z M366.433,278.995
	c0,19.478-0.323,30.514-7.266,49.246c-22.072,59.568-83.674,101.171-149.805,101.171c-39.44,0-74.264-14.651-98.054-41.255
	c-21.465-24.003-31.252-55.38-27.56-88.352c5.971-53.296,57.724-96.655,115.367-96.655c28.858,0,54.313,10.692,71.675,30.107
	c15.618,17.466,22.738,40.309,20.049,64.321c-3.796,33.896-36.813,61.473-73.599,61.473c-18.277,0-34.365-6.733-45.299-18.959
	c-9.771-10.927-14.224-25.234-12.538-40.287c1.597-14.253,16.174-26.294,31.832-26.294c7.694,0,14.414,2.774,18.919,7.812
	c3.926,4.39,5.712,10.163,5.03,16.258c-0.613,5.488,3.339,10.436,8.827,11.05c5.491,0.616,10.436-3.338,11.05-8.827
	c1.322-11.827-2.229-23.125-10-31.813c-8.229-9.201-20.559-14.479-33.826-14.479c-12.458,0-24.656,4.494-34.346,12.655
	c-9.856,8.303-16.022,19.458-17.361,31.412c-2.328,20.786,3.889,40.619,17.505,55.846c14.564,16.286,36.51,25.627,60.207,25.627
	c22.563,0,44.669-8.153,62.247-22.959c17.746-14.946,28.836-34.937,31.227-56.287c3.332-29.745-5.552-58.114-25.015-79.879
	c-20.9-23.372-52.459-36.776-86.584-36.776c-32.666,0-64.681,11.813-90.148,33.265c-10.272,8.652-18.995,18.468-25.988,29.102
	V136.999l11.863-9.379l28.68,11.269v29.836c0,5.522,4.478,10,10,10s10-4.478,10-10V79.951l11.863-9.379l28.942,11.373v69.525
	c0,5.522,4.478,10,10,10s10-4.478,10-10V32.761l28.891-11.352l11.863,9.378v125.889c0,5.522,4.478,10,10,10s10-4.478,10-10V81.925
	l28.891-11.353l11.863,9.379v120.748c0,5.522,4.478,10,10,10s10-4.478,10-10V138.91l28.733-11.29l11.863,9.379V278.995z"/>
</svg>
  );
  const SettingsIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"/>
<path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
</svg>
  );

  const LogoutIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  );

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate('/login');
      window.location.reload()
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
function NavItem({ label, onClick, className, icon }: { 
    label: string; 
    onClick?: () => void | Promise<void>; 
    className?: string;
    icon?: React.ReactNode;
  }) {
    return (
      <button onClick={onClick} className={`flex items-center text-gray-700 hover:text-black space-x-2 p-2 ${className || ''}`}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }
  
const userDetails = localStorage.getItem('user');
const user = JSON.parse(userDetails || '{}');
  return (
    <div className="flex min-h-screen bg-gray-100 flex flex-row w-full">
      {/* Sidebar */}
      {/* <aside className="w-1/10 min-w-[200px] bg-white border-r flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-switzer font-semibold mb-6 text-gray-900 text-center">MindDost</h1>
          <nav className="space-y-1">
            <NavItem 
              label="home" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')}
              icon={<HomeIcon />}
            />
            <NavItem 
              label="profile" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')} 
              icon={<ProfileIcon />} 
            />
            <NavItem 
              label="session history" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/session')} 
              icon={<SessionHistoryIcon />}
            />
            <NavItem 
              label="feedback" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/Landing')}
              icon={<FeedbackIcon />}
            />
            <NavItem 
              label="therapist" 
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
              onClick={() => navigate('/therapists')} 
              icon={<TherapistIcon />}
            />
          </nav>
        </div>
        <div>
          <NavItem 
            label="settings" 
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
            onClick={() => navigate('/settings')} 
            icon = {<SettingsIcon />}
          />
          <NavItem 
            label="log out" 
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400" 
            onClick={handleLogout}
            icon={<LogoutIcon />} 
          />
          <div className="mt-4">
            <div className="text-sm flex justify-between font-satoshi">
              <span className="px-2 py-1 rounded border border-gray-400 text-gray-900 bg-white">free</span>
              <span className="px-2 py-1 rounded text-gray-900 bg-white">1/3 sessions</span>
            </div>
            <div className="h-2 bg-gray-300 w-full rounded overflow-hidden mt-2">
              <div className="h-full bg-black w-1/3"></div>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-switzer font-semibold py-2 mt-2 rounded">
              upgrade
            </button>
          </div>
        </div>
      </aside> */}
      
      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-md w-full text-gray-900 font-satosh ml-10">
        <h2 className="text-2xl font-semibold mb-4">{user.email}</h2>
        <hr className="border-t border-gray-300 mb-4"/>
        {/* Privacy Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Privacy Settings</h3>
          <p className="text-gray-600">Manage your cookie and tracking preferences</p>
          <div className="mt-2 ">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="toggle-checkbox" disabled />
              <span>Necessary Cookies</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" className="toggle-checkbox" />
              <span>Analytics Cookies</span>
            </label>
          </div>
        </div>
        <hr className="border-t border-gray-300 mb-4 mt-10"/>

        
        {/* Subscription Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Subscription Settings</h3>
          <h4 className="text-gray-600">manage subscription settings</h4>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3">Upgrade</button>
        </div>
        <hr className="border-t border-gray-300 mb-10 mt-10"/>

        {/* Danger Zone */}
        <div>
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
          <p className="text-gray-600">Be careful with these settings</p>
          <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md">Reset Chat History</button>
        </div>
        <hr className="border-t border-gray-300 mb-10 mt-10"/>

      </main>
    </div>
  );
};

export default SettingsPage;
