import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  imageSrc: string;
}

const Header: React.FC<HeaderProps> = ({ title, imageSrc }) => {
  return (
    <div className="header">
      <img src={imageSrc || './../cocktail.webp'} className="header-image" />
      <h1 className="header-title">
        {title}
      </h1>
    </div>
  );
};

export default Header;
