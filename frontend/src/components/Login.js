import React from "react";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (event) => {
    console.log(this.state);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post("/users/login", this.state);
    console.log(data);
  };

  render() {
    
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="enter username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          ></input>
          <input
            type="password"
            placeholder="enter pass"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Hello</button>
        </form>
      </div>
    );
  }
}

export default Login;
