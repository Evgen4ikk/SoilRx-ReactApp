import { useCallback, useEffect, useRef, useState } from 'react'

export const useCountdownTimer = (initialTime: number, interval = 1) => {
    const [timerCounter, setTimerCounter] = useState(initialTime)
    const [isCountdownEnded, setIsCountdownEnded] = useState(false)
    const intervalRef = useRef(0)

    const reset = useCallback(() => {
        setTimerCounter(initialTime)
        setIsCountdownEnded(false)
    }, [initialTime])

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setTimerCounter((prevTime) => {
                if (prevTime <= 0) {
                    window.clearInterval(intervalRef.current)
                    setIsCountdownEnded(true)

                    return 0
                }

                return prevTime - interval
            })
        }, interval * 1000)

        return () => {
            window.clearInterval(intervalRef.current)
        }
    }, [initialTime, interval, isCountdownEnded])

    return { timeLeft: timerCounter, reset, isCountdownEnded }
}
