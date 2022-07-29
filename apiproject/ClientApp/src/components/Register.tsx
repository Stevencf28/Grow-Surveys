export default function Register() {
    return (
        <div className="Login-form-container">
            <form className="Login-form" method="POST">
                <div className="Login-form-content">
                    <h3 className="Login-form-title">Register</h3>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter First Name"
                            name="firstName"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter Last Name"
                            name="lastName"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter Username"
                            name="username"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>User Type</label>
                        <select
                            name="userType"
                            className="form-control mt-1"
                            required
                        >
                            <option selected> </option>
                            <option value="company">Company</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
    }