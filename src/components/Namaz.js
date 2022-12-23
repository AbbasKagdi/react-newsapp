import React, { Component } from 'react'

export default class Salaat extends Component {

    render() {
        // sanitises time before display
        function getTime(dateString) {
            try{
                let time = dateString.split(" ")[1].substring(0,5)
                let hour = time.split(":")[0]
                if(hour > 12){
                    return hour - 12 + ":" + time.split(":")[1] + " PM"
                }
                return time + " AM"
            }
            catch(err){
                console.log(dateString, err)
            }
        }

        // get timings object
        const t = this.props.data[this.props.date]

        return (
            <>
                <div className='container col-md-4 text-center'>
                    <table className="table table-bordered border-dark bg-light">
                        <thead>
                            <tr>
                                <td colSpan={2}>
                                    Showing Namaz timings for
                                    <h4>Ratlam</h4>
                                    Daylight Saving is Off
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Sihori (end)</td><td>{getTime(t.sihori)}</td></tr>
                            <tr><td>Fajr (begin)</td><td>{getTime(t.fajr)}</td></tr>
                            <tr><td>Sunrise</td><td>{getTime(t.sunrise)}</td></tr>
                            <tr><td>Zawaal</td><td>{getTime(t.zawaal)}</td></tr>
                            <tr><td>Zuhr (end)</td><td>{getTime(t.zohr_end)}</td></tr>
                            <tr><td>Asr (end)</td><td>{getTime(t.asr_end)}</td></tr>
                            <tr><td>Maghrib</td><td>{getTime(t.maghrib)}</td></tr>
                            <tr><td>Maghrib (end)</td><td>{getTime(t.maghrib_end)}</td></tr>
                            <tr><td>Nisful Layl (begin)</td><td>{getTime(t.nisful_layl)}</td></tr>
                            <tr><td>Nisful Layl (end)</td><td>{getTime(t.nisful_layl_end)}</td></tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
