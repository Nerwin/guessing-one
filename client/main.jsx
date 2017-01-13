import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Navbar from '/client/components/navbar';

export const MainLayout = ({ container }) => (
    <div>
        <div className="container-fluid">
            <Navbar />
            <div className="row">
                <div className="col-sm-12">
                    {container()}
                </div>
            </div>
        </div>
    </div>
);