import React from 'react'
import UploadDoc from '@/quizz/UploadDoc'

const page = () => {
  return (
    <>
        <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
            <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
            <UploadDoc />
        </main>
    </>
  )
}

export default page