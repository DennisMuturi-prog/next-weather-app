
export default function Home() {
  return (
    <div>
      <div></div>
      <div className="navbar">
        <div className="navbar-center">
          <div className="dropdown">
          <input className="input" placeholder="enter location" />
            <div className="dropdown-menu">
              <a className="dropdown-item text-sm">Profile</a>
              <a tabIndex={-1} className="dropdown-item text-sm">Account settings</a>
              <a tabIndex={-1} className="dropdown-item text-sm">Subscriptions</a>
            </div>
          </div>
          <button className="btn btn-primary" >search</button>
        </div>
        <div className="navbar-end">
          <div className="tabs tabs-boxed">
            <input type="radio" name="units" id="unit1" className="tab-toggle" defaultChecked />
            <label htmlFor="unit1" className="tab navbar-item">Celcius</label>
            <input type="radio" name="units" id="unit2" className="tab-toggle" />
            <label htmlFor="unit2" className="tab">Fahrenheit</label>
            <input type="radio" name="units" id="unit3" className="tab-toggle" />
            <label htmlFor="unit3" className="tab">Kelvin</label>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>

    </div>
  );
}
