import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Navbar from '/client/components/navbar';

export const MainLayout = ({ container }) => (
    <div>
        <Navbar />
        <div className="container-fluid card">
            {container()}
        </div>
    </div>
);
