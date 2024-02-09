import { decrementTimer } from '@/app/features/testWatchSlice';
import { ReduxRootState } from '@/app/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface TimerProps {
    handleEntireTestSubmit: () => void
}

const Timer = ({handleEntireTestSubmit}: TimerProps) => {

    const timer = useSelector((state: ReduxRootState) => state.testWatch.timer);
    const duration = useSelector((state: ReduxRootState) => state.testWatch.duration);
    const dispatch = useDispatch();

    const formatTime = (time: number) => time < 10 ? `0${time}` : time;
    const second = formatTime(timer % 60);
    const minute = formatTime(Math.floor(timer / 60) % 60);
    const hour = formatTime(Math.floor(timer / 3600));
    const current_degree = (duration - timer) * 360 / duration;
    const timer_styles = {
        height: "60%",
        width: "auto",
        aspectRatio: "1/1",
        border: "3px solid #0b68a3",
        borderRadius: "50%",
        backgroundImage: `conic-gradient(#0b68a3 0deg,#0b68a3 ${current_degree}deg, white ${current_degree}deg,white 360deg)`
    }


    //timer
    useEffect(() => {
        if (timer === 0) handleEntireTestSubmit();
        const interval = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);
        if (timer === 0) clearInterval(interval);
        return () => {
            clearInterval(interval);
        }
    }, [timer]);

    return (
        <>
            <div style={timer_styles} className='timer-clock'></div>
            <div className='flex text-xl font-bold'>
                <div>{hour}</div>:
                <div>{minute}</div>:
                <div className=''>{second}</div>
            </div>

        </>
    )
}

export default Timer