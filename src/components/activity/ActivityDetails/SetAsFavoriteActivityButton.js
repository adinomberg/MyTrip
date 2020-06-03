import React, {useState} from 'react';
import {addFavoriteActivityToUserTrip} from "../../../server/firebase";
import './ActivityDetails.css';
import _ from 'underscore';


const SetAsFavoriteActivityButton = ({currentUser, activity}) => {
    const [favActivityError, setFavActivityError] = useState(null);
    const [favActivitySuccess, setFavActivitySuccess] = useState(null);

    const handleAddToFavoriteActivities = async (event, user, activity) => {
        event.preventDefault();
        console.log('entered handleAddToFavoriteActivities');
        if (user.trip != null || user.trip) {
            console.log('entered trip is not null');
            if (activity) {
                if (_.isEmpty(user.trip.favoriteactivities) || !user.trip.favoriteactivities ||
                    (user.trip.favoriteactivities && _.where(user.trip.favoriteactivities, {id: activity.id}) == null)) {
                    try {
                        await addFavoriteActivityToUserTrip(user, activity);
                        console.log('trip updated');
                        setFavActivitySuccess('Activity added to your trip successfully!');
                        window.location.href = '/mytrip';
                    } catch (favActivityError) {
                        setFavActivityError('Error saving favorite activity');
                    }
                } else {
                    setFavActivityError('This activity has already been inserted!');
                    console.log("error duplicate activity-", favActivityError);
                }
            } else {
                setFavActivityError('Select activities first!');
                console.log("error need to choose activities first-", favActivityError);
            }
        } else {
            setFavActivityError('Create trip first!');
            console.log("error need to create trip first-", favActivityError);
            window.location.href = '/mytrip';
        }
    }

    return (
        <div className="submit-fav-act-button-container">
            <button className="submit-fav-act-button"
                    onClick={e => handleAddToFavoriteActivities(e, currentUser, activity)}>
                Set as my favorite activity
            </button>
            {favActivitySuccess &&
            <div className="activity-success-message">
                <i className="fa fa-check-circle"></i> {favActivitySuccess}
            </div>
            }
            {favActivityError &&
            <div className="activity-error-message">
                <i className="fa fa-exclamation-circle"></i> {favActivityError}
            </div>
            }
        </div>
    );
};

export default SetAsFavoriteActivityButton;