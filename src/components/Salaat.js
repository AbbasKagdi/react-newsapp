import React, { Component } from 'react'
import Namaz from './Namaz'
import Loading from './Loading'

// main url
// https://mumineen.org/api/v1/salaat-widget?location=ratlam

export default class Salaat extends Component {

    fetchTimings = async () => {
        const today = new Date().toISOString().slice(0, 10)
        // sample api https://www.mumineen.org/api/v1/salaat?start=2022-05-25&latitude=23.3315&longitude=75.04222&timezone=Asia%2FKolkata&altitude=0
        const url = `https://www.mumineen.org/api/v1/salaat?start=${today}&latitude=23.3315&longitude=75.04222&timezone=Asia%2FKolkata&altitude=0`
        await fetch(url)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    timings: json.data,
                    loaded: true,
                    today: today
                });
                // console.log(timings)
            })
            .catch((e) => console.log(e.message))
    }

    constructor() {
        super()
        this.state = {
            timings: null,
            loaded: false,
            today: null
        }
    }

    async componentDidMount() {
        console.log("CDM triggered")
        await this.fetchTimings()
        console.log(this.state.loaded)
    }

    render() {
        if(this.state.loaded)
        return (
            <>
                <div className='container text-center my-5'>
                    <br /><h1>Salaat Timings</h1>
                    <p>by <span className="text-danger"><u>Mumineen.org</u></span></p>
                </div>
                {this.state.loaded && <Namaz data={this.state.timings} date={this.state.today} />}
            </>
        )
        else{
            return (<Loading />)
        }
    }
}
