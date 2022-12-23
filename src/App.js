import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Salaat from './components/Salaat';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API_1

  // reload progress bar
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Routes>
          {/* <Route path="/inshorts" element={<Inshorts />} /> */}
          <Route path="/salaat" element={<Salaat />} />
          <Route path="/" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="general" category="general" />} />
          <Route path="/business" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="business" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="entertainment" category="entertainment" />} />
          <Route path="/general" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="general" category="general" />} />
          <Route path="/health" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="health" category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="science" category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="sports" category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} pageSize={pageSize} country="in" apiKey={apiKey} key="technology" category="technology" />} />
        </Routes>
      </Router>
    </>
  )
}
