import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import * as React from 'react';
import open_link from './images/link_open.png'
import { useState } from "react";
import json from './ResumeJsonData.json'
import MusicPlayer from './MusicPlayer';
import FadeInOut from './FadeInOut';

function App() {
  const [resumeData, setResumeData] = useState(json);
  const [language, setLanguage] = useState(0)
  const [projectType, setProjectType] = useState(0)
  const [selectedResumeData, setSelectedResumeData] = useState(resumeData.contents[language]);

  const [show, setShow] = useState(true);

  const setDefaultLangugage = (index) => {
    setSelectedResumeData(resumeData.contents[index])
    setLanguage(index)
  }

  const setDefaulProjectType = (index) => {
    setProjectType(index)
  }

  return (
    <FadeInOut show={show} duration={1000}>
      <div className='root'>
        <div className="header_container">
          <div className="profile">
            <img className="photo" src={process.env.PUBLIC_URL + selectedResumeData.photo_url} alt="" />
            <div className="title_container">
              <div className="name">{selectedResumeData.name}</div>
              <div className="title">{selectedResumeData.title}</div>
              <div className="social_icons">

                <MusicPlayer />
                {
                  resumeData.links.map((data) => {
                    return (
                      <SocialLink alt={data.link_title} href={data.link_url} icon={data.link_icon} />
                    )
                  })
                }
              </div>
            </div>
            <div className="language_selector">
              {
                resumeData.contents.map((resume, index) => {
                  return (
                    <span onClick={s => setDefaultLangugage(index)} className={language == index ? "item_clicked" : "item"}>{resume.language}</span>
                  );
                })
              }
            </div>
          </div>
          <div className="bio">{selectedResumeData.bio}</div>
        </div>

        <div className="content_container">
          <div className="skills">
            {
              <ContentSection title={selectedResumeData.skills.title}>
                {
                  selectedResumeData.skills.sections.map((skill) => {
                    return (
                      <SmallContentItem title={skill.title} body={skill.description} />
                    )
                  })
                }

              </ContentSection>
            }
          </div>
          <div className="experience">
            {
              <ContentSection title={selectedResumeData.experiences.title}>
                {
                  selectedResumeData.experiences.sections.map((experience) => {
                    return (
                      <LargeContentItem title={experience.title} url={experience.url} subtitle={experience.subtitle} body={experience.descriptions} />
                    )
                  })
                }

              </ContentSection>
            }
          </div>

          <div className="projects">
            {
              <ContentSection title={selectedResumeData.projects.title}>
                <div className="project_types_container">
                  {
                    selectedResumeData.projects.categories.map((category, index) => {
                      return (
                        <div onClick={s => setDefaulProjectType(index)} className={projectType == index ? "project_type_clicked" : "project_type"}>{category.category}</div>
                      )
                    })
                  }
                </div>
                {
                  selectedResumeData.projects.categories[projectType].projects.map((project) => {
                    return (
                      <LargeContentItem title={project.title} url={project.url} subtitle={project.subtitle} body={project.descriptions} />
                    )
                  })
                }
              </ContentSection>
            }
          </div>

          <div className="education">
            {
              <ContentSection title={selectedResumeData.education.title}>
                {
                  selectedResumeData.education.sections.map((ed) => {
                    return (
                      <LargeContentItem title={ed.title} url={""} subtitle={ed.subtitle} body={[]} />
                    )
                  })
                }
              </ContentSection>
            }
          </div>

          <div className="languages">
            {
              <ContentSection title={selectedResumeData.languages.title}>
                {
                  selectedResumeData.languages.sections.map((language) => {
                    return (
                      <SmallContentItem title={language.title} body={language.description} />
                    )
                  })
                }

              </ContentSection>
            }
          </div>

          <div className="hobbies">
            {
              <ContentSection title={selectedResumeData.hobbies.title}>
                {
                  selectedResumeData.hobbies.sections.map((hobby) => {
                    return (
                      <SmallContentItem title={hobby.title} body={hobby.description} />
                    )
                  })
                }

              </ContentSection>
            }
          </div>
        </div>
        <div className="copyright_title">{resumeData.signature}</div>
      </div>
    </FadeInOut>

  );
}


const ContentSection = ({ title, children }) => {
  return (
    <div className="content_section">
      <div className="content_header">{title}</div>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

const SmallContentItem = ({ title, body }) => {
  return (
    <div className="small_content_item">
      <span className="title">{title} {body == "" ? "" : ": "} </span>
      <span className="body">{body}</span>
    </div>
  )
}

const LargeContentItem = ({ title, url, subtitle, body }) => {
  return (
    <div className="large_content_item">
      <div className="title">
        {title} {url ? <a href={url} target="_blank"><img src={open_link} alt="" /></a> : ""}
      </div>
      <div className="subtitle">{subtitle}</div>
      <div>
        {
          body.map((desc) => {
            return (<div className="body">{body.length == 1 ? "" : "➤"} {desc}</div>)
          })
        }
      </div>
    </div>
  )
}

const SocialLink = ({ href, icon, alt }) => {
  return (
    <a href={href} target="_blank"><img className='social' src={process.env.PUBLIC_URL + icon} alt={alt} /></a>
  )
}


export default App;
