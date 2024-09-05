/* eslint-disable jsx-a11y/alt-text */
/** @format */

import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: 'indigo',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        zIndex: 1000
      }}
    >
      <img
        src='https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9'
        style={{ height: '100vh', width: '100vw', objectFit: 'cover' }}
      />
      <div className='inset-0 bg-black opacity-25 absolute'></div>
      <div
        style={{
          zIndex: 10,
          position: 'fixed',
          top: '50%',
          left: '65%'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'extrabold',
              fontFamily: 'dunggeunmo-bold'
            }}
          >
            You are all alone here
          </h1>
          <span
            className='animate-bounce'
            style={{
              fontFamily: 'dunggeunmo-bold',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'extrabold',
              transition: 'transform 0.3s'
            }}
          >
            404
          </span>
        </div>
        <Link href='/'>
          <Typography variant='h5' sx={{ color: 'white', fontSize: '2rem' }}>
            Go home →
          </Typography>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
