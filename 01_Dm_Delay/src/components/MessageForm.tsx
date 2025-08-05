import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'

const MessageForm = () => {
    const[message, setMessage] = useState<string>('');
    const[delay, setDelay] = useState<number>(10);
    const[isSending, setIsSending] = useState<boolean>(false);
    const[timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const[sentMessage, setSentMessage] = useState<string>("");

    const handleSend = () => {
        setIsSending(true);

        const id = setTimeout(() => {
            setSentMessage(message);
            setMessage('');
            setIsSending(false);
        }, delay * 1000);

        setTimerId(id);
    }

    const handleCancel = () => {
        if(timerId) clearTimeout(timerId);
        setIsSending(false);
    }


  return (
    <div className='max-w-xl mx-auto border rounded-lg shadow-lg text-gray-800 bg-white'>
        <h1 className='text-xl font-semibold border-b p-6 text-center'>Message Delay</h1>
          <div className='p-6 space-y-3'>
            <Textarea
            className='resize-none'
            placeholder='Type your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <Input
            type='number'
            placeholder='Delay in seconds'
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            disabled={isSending}
            />
              {!isSending ? (<Button className='w-full' onClick={handleSend}>Send with delay</Button>):(
                  <Button className='w-full' variant="destructive" onClick={handleCancel}>Cancel message</Button>
              )}

              {sentMessage && 
                <div className='bg-green-50 rounded p-3 text-green-700'>
                    <p className='font-semibold'>Message Sent:</p>
                    <p>{sentMessage}</p>
                </div>
              }
        </div>
       
    </div>
  )
}

export default MessageForm