export const toggle = () => {
  this.setState({
    collapsed: !this.state.collapsed,
    minimized: !this.state.minimized
  });
};

export const checkWidth = () => {
  let md = 768;
  let width = window.innerWidth;

  if (!this.state.minimized) {
    this.setState({
      collapsed: false,
      minimized: false
    });
  } else {
    this.setState({
      collapsed: true,
      minimized: true
    });
  }
};

export const mouseOver = () => {
  console.log("mouseOver : ", this.state.collapsed);

  if (this.state.collapsed) {
    this.setState({
      collapsed: false
    });
  }
};

export const mouseOut = () => {
  console.log("mouseout : ", this.state.collapsed);

  if (this.state.minimized) {
    this.setState({
      collapsed: true
    });
  }
};
