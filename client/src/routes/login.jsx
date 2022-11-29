import { useEffect, useState } from 'react';
import '../styles/app_styles/login.scss';
import SVG from './GYSTLogo.svg'
import SVGDevImg from './DevImage.svg'
import SVGADHDImg from './ADHDimage.svg'
import SVGOrganizedImg from './FindImage.svg'
export default function Login(){
    return(
        <div className='login-page'>
                <div className='navbar'>
                    <div className='navbar-brand'>
                        <h1>GitYour<span className='red-text'>Shit</span>Together</h1>
                    </div>
                    <div className='navbar-links'>
                        <a href="https://gityourshittogether.herokuapp.com/auth-req">Log-in With Github</a>
                    </div>
                </div>
                <div className='login-header'>
                    <div className='header-text-backdrop'>
                    </div>
                    <img src={SVG} alt="View of GYST dashboard (active)"></img>
                </div>
                <section className='about-section'>
                    <h1>About <span className="yellow-text">GYST</span></h1>
                    <hr></hr>
                    <div className='about-box'>
                        <div className='image-backdrop yellow'>
                            <img src={SVGDevImg}></img>
                        </div>
                        <div>
                            <h2>Github Management Dashboard for Developers</h2>
                            <hr></hr>
                            <p>
                            GitYour<span className='red-text'>Shit</span>Together is a go-to solution
                            for developers and programmers alike to have a quick, detailed view of the crucial
                            aspects of their Github account, including:
                            </p>
                            <ul>
                                <li>Public & private repo counts, contents, commits, etc.</li>
                                <li>Assigned issues, issue statuses, and even parsed issue details.</li>
                                <li>Social Metrics, Projects, and Gist counts.</li>
                                <li>Consistent updates to keep things fresh!</li>
                            </ul>
                        </div>
                    </div>

                    <div className='about-box'>
                        <div className='image-backdrop pink'>
                            <img src={SVGADHDImg}></img>
                        </div>
                        <div>
                            <h2>ADHD-Friendly Design Philosophy</h2>
                            <hr></hr>
                            <p>
                            With ADHD having a significant impact on my executive functioning,
                            I knew that Github, as it's currently designed, was going to be a 
                            place where I dumped my code much as I dumped that random gadget I found
                            and never touched again.
                            </p>
                            <br></br>
                            <p>
                            GYST is designed to intentionally provide real-time data in one easy-to-view display. With
                            minimalist styling, the GYST dashboard is tuned to remove distractions,
                            and if you find your executive dysfunction gets in the way of your Github management- GYST
                            is here to help!
                            </p>
                        </div>
                    </div>

                    <div className='about-box'>
                        <div className='image-backdrop red'>
                            <img src={SVGOrganizedImg}></img>
                        </div>
                        <div>
                            <h2>Github data where you need it, when you need it</h2>
                            <hr></hr>
                            <p>
                            GYST uses dynamic data refreshing to keep your dashboard up to date, and with a simple, responsive
                            design GYST is your bestfriend for Github management! Through Github's OAuth secure service, not only is your data
                            at your fingertips, but you can rest assured that it's safe from the nefarious shadows that dwell in the internet's underbelly!
                            </p>
                        </div>
                    </div>

                </section>


                <section className='get-started-section'>
                    <div className='get-started-box'>
                        <h1>Getting started is simple- just log-in!</h1>
                        <p>
                            I don't know about you, but I F<span className='blackout'>uck</span>ing hate registering for sites.
                            Well, here at GYST, registration is as simple as logging in thanks to Github OAuth2.0 support. Log-in below and see
                            for yourself how much simpler it gets from here- your Github can finally be organized again!
                        </p>
                        <a href="https://gityourshittogether.herokuapp.com/auth-req">Log-in With Github</a>
                        <div className='disclaimer'>
                        <h2>Terms of Service</h2>
                        <p>
                            By logging in with Github you agree to GitYourShitTogether's terms of service.
                        </p>
                        <p>
                            Here at GYST, we only store the data you need for your Github management as well as
                            data we expect to be crucial in a future update; furthermore, data is used primarily
                            and solely for providing a better user experience:
                        </p>
                        <ul>
                            <li>Private and public repo contents</li>
                            <li>Assigned issues and their contents</li>
                            <li>Social metric data (followers and following)</li>
                            <li>Private gist contents</li>
                            <li>Project data</li>
                        </ul>
                        <br></br>
                        <p>
                            We do not, and will not, sell/share any of your data with third-parties. We value your privacy
                            and productivity!
                        </p>
                        <p>&copy;GitYourShitTogether 2022</p>
                        </div>
                    </div>
                </section>
        </div>
    )
}
