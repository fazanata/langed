import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PuzzleTask from './puzzleTask/puzzleTask'
import Home from './Home'
import FindWordImage from './findWordImage/findWordImage'
import ListLessons from './lessons/listLessons'
import Lesson from './lessons/lesson'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/puzzleTask' component={PuzzleTask} />
      <Route path='/findWordImage' component={FindWordImage} />
      <Route path='/section/:ids' component={ListLessons} />
      <Route path='/lesson/:idl' component={Lesson} />
    </Switch>
  </main>
)

export default Main;