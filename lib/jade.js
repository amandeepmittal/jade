'use babel';

import JadeView from './jade-view';
import { CompositeDisposable } from 'atom';

export default {

  jadeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jadeView = new JadeView(state.jadeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jadeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jade:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jadeView.destroy();
  },

  serialize() {
    return {
      jadeViewState: this.jadeView.serialize()
    };
  },

  toggle() {
    console.log('Jade was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
