import '../../styles/components/analytics/analyticscontainer.scss'
import { useEffect, useRef, useState } from 'react'
import { Carousel, ProgressBar } from 'react-bootstrap'
import { RadialBar } from '@nivo/radial-bar'
import './ScrnShtMissing.svg'

export default function AnalyticsContainer(){

    const [netData, setNetData] = useState([])

    // Might fetch twice?

    const fetchNetlifySites =async  () => {
        const data = await fetch('/sitedata', {
            method: 'GET',
        }).then(res=>res.json()).then(data=> {return data})
            setNetData(data)
            }
            
    useEffect(()=>{
        fetchNetlifySites()
    }, [])

    // For Carousel

    const [index, setIndex] = useState(0);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
      
      const ControlledCarousel = () => {
        if(netData.length > 0){
        return (
          <Carousel style={{width: '100%'}} activeIndex={index} onSelect={handleSelect}>
            {netData.map((site)=>{
                let listDisp = ''
                let chartDisp = ''
                let screenshotDisp = ''


                if(site.screenshot_url != null){
                    screenshotDisp = <div style = {{backgroundImage: `url(${site.screenshot_url || ''})`}} className = 'screenshot'>
                    </div>
                }
                else{
                    screenshotDisp = <div
                    style = {{backgroundSize: 'cover'}}
                    className = 'screenshot'>
                    </div>
                }

                // Necessary to check for Site Data w/o Crashing

                if(site.build_settings.public_repo){
                     listDisp=
                        <ul className = 'repo-info-list'>
                        <li><span>Repo Type: </span><p>{site.build_settings.repo_type}</p></li>
                        <li><span>Repo Path: </span><p>{site.build_settings.repo_path}</p></li>
                        <li><span>Repo URL: </span><a href = {site.build_settings.repo_url}>Link</a></li>
                    </ul>
                    
                } else {
                    listDisp = `Deploy netlify site w/ a public repository to connect and view repo  information.`
                }

                // Necessary to check for Site Data w/o Crashing

                if(site.published_deploy.site_capabilities.forms){
                    chartDisp = 
                    <li>
                    <label className = 'form-label' htmlFor = 'submissions'>Submissions: </label>
                    <ProgressBar
                    animated
                    name = 'submissions'
                    now = {site.published_deploy.site_capabilities.forms.submissions.used}
                    max = {site.published_deploy.site_capabilities.forms.submissions.included}
                    variant = 'purple'
                    style = {{backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    borderRadius: '16px',
                    width: '70%',
                }}
                label={`${site.published_deploy.site_capabilities.forms.submissions.used /site.published_deploy.site_capabilities.forms.submissions.included}%`}
                    ></ProgressBar>
                    <li>Used: {site.published_deploy.site_capabilities.forms.submissions.used}</li>
                    <li>Available: {site.published_deploy.site_capabilities.forms.submissions.included} submissions</li>
                    <label className='form-label-2 ' htmlFor = 'storage'>Storage: </label>
                    <ProgressBar
                    animated
                    name = 'storage'
                    now = {site.published_deploy.site_capabilities.forms.storage.used}
                    max = {site.published_deploy.site_capabilities.forms.storage.included}
                    variant = 'red'
                    style = {{backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
                    borderRadius: '16px',
                    width: '70%',
                }}
                label={`${site.published_deploy.site_capabilities.forms.storage.used /site.published_deploy.site_capabilities.forms.storage.included}%`}
                    ></ProgressBar>
                    <li>Used: {site.published_deploy.site_capabilities.forms.storage.used}</li>
                    <li>Available: {site.published_deploy.site_capabilities.forms.storage.included} bytes</li>
                    </li>
                }
                else{
                    chartDisp = <p>This site does not have any available form data or form elements,
                    if this is believed to be an error, check Netlify deployment for more information, or
                    file an issue in github under the dashMe public repository.</p>
                }

                // Site Capabilities: Labeling Logic

               let capDisp = () => {
                return(
                    <>
                        <li><span>Form Processing: </span>{site.published_deploy.site_capabilities.form_processing.toString().toUpperCase()}</li>
                        <li><span>Secure Site: </span>{site.published_deploy.site_capabilities.secure_site.toString().toUpperCase()}</li>
                        <li><span>Prerendering: </span>{site.published_deploy.site_capabilities.prerendering.toString().toUpperCase()}</li>
                        <li><span>Proxying: </span>{site.published_deploy.site_capabilities.proxying.toString().toUpperCase()}</li>
                        <li><span>Branch Deploy: </span>{site.published_deploy.site_capabilities.branch_deploy.toString().toUpperCase()}</li>
                        <li><span>Split Testing: </span>{site.published_deploy.site_capabilities.split_testing.toString().toUpperCase()}</li>
                        <li><span>Rate Cents: </span>{site.published_deploy.site_capabilities.rate_cents}</li>
                        <li><span>Yearly Rate Cents: </span>{site.published_deploy.site_capabilities.yearly_rate_cents}</li>
                </>
                )
               }

                return(
                    <Carousel.Item className = 'resp' style = {{minHeight: '60vh', maxHeight: '60vh',border: 'none'}}>
                        <div className= 'site-container'>
                        {screenshotDisp}
                            <div className = 'site-info-basic'>
                                <h1>{site.name.toUpperCase()}</h1>
                                <ul className = 'dates-list'>
                                <li><span className='created'>Created At: </span>{site.created_at}</li>
                                <li><span className='updated'>Updated At: </span>{site.updated_at}</li>
                                <li><span className='published'>Published At: </span>{site.published_deploy.published_at}</li>
                                </ul>
                                
                            </div>

                            {/* Site: Connected Repo */}

                            <div className = 'repo-info-container'>
                                <h3>Repo Information</h3>
                                {listDisp}
                            </div>

                            {/* Form Tracker */}

                            <div className = 'form-tracking'>
                                <h4>Form Tracking</h4>
                                    <ul className = 'form-list'>
                                        {chartDisp}
                                    </ul>
                            </div>

                        {/* Site Capabilities */}

                            <div className = 'prop-tracking'>
                                <h4>Site Properties</h4>
                                    <ul className = 'prop-list'>
                                        <li><span>Plan: </span>{site.plan}</li>
                                        {capDisp()}
                                    </ul>
                            </div>
                        </div>
                    </Carousel.Item>
                )
            })}
          </Carousel>
        )}else{
            return(
                <h4 className = 'error-msg'>ERROR: Failed to load Netlify Module, perhaps
                the request limit has been reached or the personal token has expired? Access
                <a href = 'https://netlify.com'> Netlify Dev Settings</a> for more information.
            </h4>
            )
        };
      }
      
      
      
    return(
        <>
            <div className="analytics-container">
                {ControlledCarousel() || <h5>ERROR</h5>}
            </div>
        </>
    )
}