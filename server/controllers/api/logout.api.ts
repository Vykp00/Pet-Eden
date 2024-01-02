// Setting up User Logout API
// External Dependencies
import express, { Request, Response } from 'express';

// Global Config
const router: express.Router = express.Router();

// MOCK CODE
// DELETE /api/v1/logout
export default function logoutAPI(req: Request, res: Response) {
  if (req.session.id) {
    req.session.destroy(err => {
      if (err) {
        return res.status(400).send('Unable to log out')
      } else {
        // Redirect User to home page
        console.log('Log out successfully')
        return res.status(302).redirect('/')
      }
    });
  } else {
    res.end()
  }
}