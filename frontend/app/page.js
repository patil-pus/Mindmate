"use client";  // Ensure this line is at the top for Next.js

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Box, Typography, Modal, Container, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../public/logo.png';
import personImage from '../public/person.png';
import pngeggImage from '../public/pngegg.png';
import { pulsingBackground } from '../components/animations.js';

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);

  // const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Ensure it covers the full height of the viewport
        width: '100vw',  // Ensure it covers the full width of the viewport
        padding: 0,
        background: 'linear-gradient(135deg, #42a5f5, #478ed1, #7e57c2, #ab47bc)',
        backgroundSize: '400% 400%',
        animation: `${pulsingBackground} 15s ease infinite`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header with Logo and Title */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image src={logo} alt="MindMate Logo" width={40} height={40} />
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 'bold',
            color: '#fff',
            ml: 1,
          }}
        >
          MindMate
        </Typography>
      </Box>

      {/* Main Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          width: '80%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          Anonymously Connect with Therapists
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ff8a65', mb: 2 }}>
          Safe. Secure. Confidential.
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
          You don’t have to feel sad, anxious, or just not yourself all the time. Our platform allows you to chat with licensed therapists anonymously, from the comfort of your space.
        </Typography>
        <Link href="/SignIn" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ff8a65',
              color: '#fff',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': { backgroundColor: '#e65100', transform: 'scale(1.05)' },
            }}
          >
            Get Started Now
          </Button>
        </Link>
      </motion.div>

      {/* Right Image Positioned at Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: '20%',
          maxWidth: '250px',
          borderRadius: '16px',
        }}
      >
        <Image src={personImage} alt="Person" layout="responsive" width={250} height={300} priority />
      </motion.div>

      {/* Left Image Positioned at Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          width: '20%',
          maxWidth: '250px',
          borderRadius: '16px',
        }}
      >
        <Image src={pngeggImage} alt="Left Image" layout="responsive" width={250} height={300} priority />
      </motion.div>

      {/* Modal for Client or Therapist selection */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 300,
            margin: 'auto',
            mt: '20vh',
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
            Are you a Client or Therapist?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: '#42A5F5',
                color: '#fff',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#1E88E5' },
              }}
            >
              Client
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: '#AB47BC',
                color: '#fff',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#8E24AA' },
              }}
            >
              Therapist
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
