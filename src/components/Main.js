import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PuzzleTask from './puzzleTask/puzzleTask'
import Home from './Home'
import FindWordImage from './findWordImage/findWordImage'
import ListLessons from './lessons/listLessons'
import Lesson from './lessons/lesson'
import SignUp from './auth/signUp'



const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/puzzleTask' component={PuzzleTask} />
      <Route path='/findWordImage' component={FindWordImage} />
      <Route path='/section/:ids' component={ListLessons} />
      <Route path='/lesson/:idl' component={Lesson} />
      <Route path='/auth/signup' component={SignUp} />
    </Switch>
  </main>
)

export default Main;