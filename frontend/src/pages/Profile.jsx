import CardSettings from "../components/CardSettings";
import CardProfile from "../components/CardProfile";
// import AdminNavbar from "../components/AdminNavbar.js";

function Profile() {
  return (
    <>
      {/* <AdminNavbar /> */}

      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

export default Profile;
