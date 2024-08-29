import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import apartment from './img/apartment.jpg';
import parkinglot from './img/pakinglot.jpg';
import studyroom from './img/studyroom.jpg';
import topButton from './img/topbutton.png'; // import 추가
import './Home.css';  // CSS 파일 임포트
import { Link } from 'react-router-dom'; // React Router 사용

const Home = () => {
    const [showButton, setShowButton] = useState(false);
    const [lightsOn, setLightsOn] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollHeight = docHeight - winHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            setScrollProgress(scrolled);

            if (scrollTop > winHeight * 0.2) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleButtonClick = () => {
        setLightsOn(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setLightsOn(false), 3000); // 3초 후에 불이 꺼짐
    };

    return (
        <div>
            <Parallax
                bgImage={apartment}
                strength={500}
                bgImageStyle={{ height: '100vh', width: '100vw' }}
                className={`parallax-container ${lightsOn ? 'lights-on' : ''}`}
            >
                <div className="parallax-content">
                    <h1>올인원 아파트에 오신걸 환영합니다.</h1>
                    <>
                        <Link to='http://localhost:3000/login' className="parallax-button">로그인</Link>
                        <Link to='http://localhost:3000/register' className="parallax-button">회원가입</Link>
                    </>
                </div>

                {/* 게이지 바를 아파트 버튼에만 추가 */}
                {lightsOn && (
                    <div className="gauge-wrapper">
                        <div
                            className="gauge-bar"
                            style={{ '--scroll-progress': `${scrollProgress}%` }}
                        ></div>
                    </div>
                )}
            </Parallax>

            <Parallax
                bgImage={parkinglot}
                strength={500}
                bgImageStyle={{ height: '100vh', width: '100vw' }}
                className="parallax-container"
            >
                <div className="parallax-content">
                    <h1>Parking Lot</h1>
                    <Link to='http://localhost:3000/VisitPark' className="parallax-button">주차 예약</Link>
                    <Link to='http://localhost:3000/VisitList' className="parallax-button">주차 현황</Link>
                </div>
            </Parallax>

            <Parallax
                bgImage={studyroom}
                strength={500}
                bgImageStyle={{ height: '100vh', width: '100vw' }}
                className="parallax-container"
            >
                <div className="parallax-content">
                    <h1>Study Room</h1>
                    <Link to='http://localhost:3000/Study_res' className="parallax-button">독서실 사전 예약</Link>
                    <Link to='http://localhost:3000/Reservation' className="parallax-button">독서실 예약 현황</Link>
                </div>
            </Parallax>

            {showButton && (
                <div className="building-container" onClick={handleButtonClick}>
                    <img src={topButton} alt="Scroll to Top" className="building" />
                </div>
            )}
        </div>
    );
};

export default Home;
