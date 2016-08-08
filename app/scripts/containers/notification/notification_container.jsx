import React, {Component} from 'react';
import BaseContainer from '../base_container';

export default class NotificationContainer extends Component {
    _magicCount = 0

  _notificationsShowCase = [
    {
      title: 'Hey, it\'s good to see you!',
      message: 'Now you can see how easy it is to use notifications in React!',
      level: 'success',
      position: 'tr',
      action: {
        label: 'Awesome!',
        callback: function() {
          console.log('Clicked');
        }
      }
    },
    {
      title: 'I\'ll be here forever!',
      message: 'Just kidding, you can click me.',
      level: 'success',
      position: 'tr',
      autoDismiss: 0
    },
    {
      title: 'Bad things can happen too!',
      message: 'Four notification types: `success`, `error`, `warning` and `info`',
      level: 'error',
      position: 'tl'
    },
    {
      title: 'Advise!',
      message: 'Showing all possible notifications works better on a larger screen',
      level: 'info',
      position: 'tc'
    },
    {
      title: 'Warning!',
      message: 'It\'s not a good idea show all these notifications at the same time!',
      level: 'warning',
      position: 'bc',
      action: {
        label: 'Got it!'
      }
    },
    {
      title: 'Success!',
      message: 'I\'m out of ideas',
      level: 'success',
      position: 'bl'
    },
    {
      title: 'I\'m here forever...',
      message: 'Until you click me.',
      autoDismiss: 0,
      level: 'error',
      position: 'br'
    }
  ]
  _getRandomPosition () {
    var positions = ['br', 'bl', 'bc', 'tc', 'tl', 'tr'];
    return positions[Math.floor(Math.random() * ((positions.length - 1) - 0 + 1)) + 0];
  };
  _showTheMagic() {
    var self = this;
    this._notificationsShowCase.forEach(function(notification) {
      if (self._magicCount > 0) {
        notification.position = self._getRandomPosition();
      }
      App.notificationSystem.addNotification(notification);
    });
    this._magicCount++;
  }

    render() {
        return(
             <BaseContainer routes={this.props.routes}>
              <div>
                <div className="btn-show-magic-holder">
                  <button className="btn btn-outline btn-show-magic" onClick={ this._showTheMagic.bind(this) }>
                    Show me what it can do!
                  </button>
                </div>
              </div>
             </BaseContainer>
      )
   }
}
