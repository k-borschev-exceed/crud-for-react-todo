import React from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import { connect } from 'react-redux';
const jwt = require('jsonwebtoken');

class App extends React.Component {
  componentDidMount = async () => {
    await this.checkAuth();
  };

  showActive = () => this.props.showActive();
  showAll = () => this.props.showAll();
  showCompleted = () => this.props.showCompleted();

  checkAuth = async () => {
    if (localStorage['auth']) {
      const token = JSON.parse(localStorage['auth']);

      const res = await fetch('/verifyToken', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      this.props.setLoginCondition(data.status);
    } else {
      this.props.setLoginCondition(false);
    }
    if (this.props.isLoggedIn) {
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
        await this.props.updateTasks(tasks);
        this.stateTasksCounter();
      });
  };

  setSignup = () => this.props.setLogOrSignUp('signup');

  setLogin = () => this.props.setLogOrSignUp('login');

  logout = async () => {
    await this.props.clearTasks();
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
    for (let i = 0; i < this.props.tasks.length; i++) {
      if (id === this.props.tasks[i].id) return i;
    }
  };

  stateTasksCounter = () => {
    this.props.updateCounter({
      all: this.props.tasks.length,
      completed: this.props.tasks.reduce(
        (sum, current) => sum + current.isCompleted,
        0
      ),
      active: this.props.tasks.reduce(
        (sum, current) => sum + !current.isCompleted,
        0
      ),
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
    let tempItems = [...this.props.tasks];
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
    let tempItems = this.props.tasks.filter((e) => !e.isCompleted);

    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage['auth']),
      },
      method: 'DELETE',
      body: JSON.stringify(
        this.props.tasks
          .filter((x) => tempItems.indexOf(x) === -1)
          .map((item) => item.id)
      ),
    });
    await this.fetchTasks();
    this.stateTasksCounter();
  };

  render() {
    if (localStorage['auth'] && !this.props.isLoggedIn) {
      return <></>;
    }
    return (
      <div className='App'>
        <h1>todos</h1>
        {this.props.isLoggedIn && (
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
                this.props.tasksCounter.all ===
                this.props.tasksCounter.completed
              }
              isNotEmpty={this.props.tasksCounter.all}
            />

            {!!this.props.tasks.length && (
              <>
                <List
                  tasks={this.props.tasks}
                  changeCompleteness={this.changeCompleteness}
                  showCondition={this.props.visibility}
                  deleteTask={this.deleteTask}
                  taskElemHandler={this.taskElemHandler}
                  changeTask={this.changeTask}
                />
                <Footer
                  clearCompleted={this.clearCompleted}
                  showActive={this.showActive}
                  showAll={this.showAll}
                  showCompleted={this.showCompleted}
                  showCondition={this.props.visibility}
                  tasksCounter={this.props.tasksCounter}
                  logout={this.logout}
                />
              </>
            )}
          </>
        )}
        {!this.props.isLoggedIn && this.props.logOrSignUp === 'login' && (
          <Login checkAuth={this.checkAuth} setSignup={this.setSignup} />
        )}
        {!this.props.isLoggedIn && this.props.logOrSignUp === 'signup' && (
          <Signup checkAuth={this.checkAuth} setLogin={this.setLogin} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    visibility: store.visibility,
    isLoggedIn: store.isLoggedIn,
    tasksCounter: store.tasksCounter,
    tasks: store.tasks,
    logOrSignUp: store.logOrSignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showActive: () => dispatch({ type: 'filters/visibilityActiveShowed' }),
    showAll: () => dispatch({ type: 'filters/visibilityAllShowed' }),
    showCompleted: () => dispatch({ type: 'filters/visibilityCompletedShowed' }),
    setLoginCondition: (condition) =>
      dispatch({ type: 'filters/loggedInStatusChanged', payload: condition }),
    updateCounter: (tasksCounter) =>
      dispatch({ type: 'tasks/tasksCounterUpdated', payload: tasksCounter }),
    updateTasks: (tasks) => dispatch({ type: 'tasks/tasksUpdated', payload: tasks }),
    clearTasks: () => dispatch({ type: 'tasks/tasksCleared' }),
    setLogOrSignUp: (condition) =>
      dispatch({ type: 'filters/loginOrSignupStatusChanged', payload: condition }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
