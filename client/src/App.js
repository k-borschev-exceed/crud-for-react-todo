import React from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
const jwt = require('jsonwebtoken');
//title only create
//все кроме токена в локалсторадж
//после сайгнапа кидать на логин
export default class App extends React.Component {
  state = {
    tasks: [],
    showCondition: 'all',
    tasksCounter: { all: 0, completed: 0, active: 0 },
    isLoggedin: false,
    logOrSignUp: 'login',
  };

  componentDidMount = async () => {
    await this.checkAuth();
  };

  checkAuth = async () => {
    if (localStorage['auth']) {
      const token = JSON.parse(localStorage['auth']);
      //const id = JSON.parse(localStorage['auth']).userId;

      const res = await fetch('/verifyToken', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      this.setState({ isLoggedin: data.status });
    } else {
      this.setState({ isLoggedin: false });
    }
    if (this.state.isLoggedin) {
      await this.fetchTasks();
    }
  };

  fetchTasks = async () => {
    fetch('/tasks/', {
      method: 'GET',
      headers: {
        authorization: JSON.parse(localStorage['auth']),
      },
    })
      .then((res) => res.json())
      .then(async (tasks) => {
        await this.setState({ tasks });
        this.stateTasksCounter();
      });
  };

  setSignup = () => this.setState({ logOrSignUp: 'signup' });

  setLogin = () => this.setState({ logOrSignUp: 'login' });

  logout = async () => {
    await this.setState({ tasks: [] });
    await localStorage.removeItem('auth');
    await this.checkAuth();
  };

  addTask = async (title) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
    }).catch(function (err) {
      console.log(err);
    });
    await this.fetchTasks();
  };

  findIndexById = (id) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (id === this.state.tasks[i].id) return i;
    }
  };

  stateTasksCounter = () => {
    this.setState({
      tasksCounter: {
        all: this.state.tasks.length,
        completed: this.state.tasks.reduce(
          (sum, current) => sum + current.isCompleted,
          0
        ),
        active: this.state.tasks.reduce(
          (sum, current) => sum + !current.isCompleted,
          0
        ),
      },
    });
  };

  changeCompleteness = async (id, isCompleted) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'PATCH',
      body: JSON.stringify([{ id: id, setComplete: isCompleted }]),
    });
    await this.fetchTasks();
    this.stateTasksCounter();
  };

  deleteTask = async (id) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'DELETE',
      body: JSON.stringify([id]),
    });
    await this.fetchTasks();
  };

  changeTask = async (value, id) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'PATCH',
      body: JSON.stringify([{ id: id, title: value }]),
    });
    await this.fetchTasks();
  };

  completeAll = async () => {
    let tempItems = [...this.state.tasks];
    tempItems[0].setComplete = false;
    tempItems.forEach((item) => {
      if (!item.isCompleted) tempItems[0].setComplete = true;
    });

    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'PATCH',
      body: JSON.stringify(
        tempItems.map((item) => {
          if (item.hasOwnProperty('setComplete'))
            return { id: item.id, setComplete: item.setComplete };
          return { id: item.id };
        })
      ),
    });
    await this.fetchTasks();
    this.stateTasksCounter();
  };

  clearCompleted = async () => {
    let tempItems = this.state.tasks.filter((e) => !e.isCompleted);

    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'DELETE',
      body: JSON.stringify(
        this.state.tasks
          .filter((x) => tempItems.indexOf(x) === -1)
          .map((item) => item.id)
      ),
    });
    await this.fetchTasks();
    this.stateTasksCounter();
  };

  showActive = () => this.setState({ showCondition: 'uncompleted' });

  showAll = () => this.setState({ showCondition: 'all' });

  showCompleted = () => this.setState({ showCondition: 'completed' });

  render() {
    if (localStorage['auth'] && !this.state.isLoggedin) {
      return ( <></> )
    }
    return (
      <div className='App'>
        <h1>todos</h1>
        {this.state.isLoggedin && (
          <>
            <p className='username'>
              Logged as {jwt.decode(JSON.parse(localStorage['auth'])).email}{' '}
              <span onClick={this.logout} className='logout'>
                {' '}
                Logout{' '}
              </span>
            </p>
            <Input
              addTask={this.addTask}
              completeAll={this.completeAll}
              isAllCompleted={
                this.state.tasksCounter.all ===
                this.state.tasksCounter.completed
              }
              isNotEmpty={this.state.tasksCounter.all}
            />

            {!!this.state.tasks.length && (
              <>
                <List
                  tasks={this.state.tasks}
                  changeCompleteness={this.changeCompleteness}
                  showCondition={this.state.showCondition}
                  deleteTask={this.deleteTask}
                  taskElemHandler={this.taskElemHandler}
                  changeTask={this.changeTask}
                />
                <Footer
                  clearCompleted={this.clearCompleted}
                  showActive={this.showActive}
                  showAll={this.showAll}
                  showCompleted={this.showCompleted}
                  showCondition={this.state.showCondition}
                  tasksCounter={this.state.tasksCounter}
                  logout={this.logout}
                />
              </>
            )}
          </>
        )}
        {!this.state.isLoggedin && this.state.logOrSignUp === 'login' && (
          <Login checkAuth={this.checkAuth} setSignup={this.setSignup} />
        )}
        {!this.state.isLoggedin && this.state.logOrSignUp === 'signup' && (
          <Signup checkAuth={this.checkAuth} setLogin={this.setLogin} />
        )}
      </div>
    );
  }
}
