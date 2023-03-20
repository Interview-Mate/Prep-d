import Navbar from "../Components/Navbar";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-title">Hi, username!</div>
        <div className="profile-element">
          <label htmlFor="level">Your level of experience</label>
          <select
            id="level"
            name="level"
            autoComplete="level"
            required
            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>
    </>
  );
}
