import React, { useEffect } from 'react';

import styled from 'styled-components';

const FooterBarStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: .75em;
  text-align: center;
  padding: 1em;
  font-weight: bold;
  display: block;
  background: #333;
  color: white;
`;

function FooterBar(props) {
    // const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        console.log("ouverture de la footerbar - componentDidMount")
        return () => {
            console.log("fermeture de la footerbar - componentWillUnmount")
        };
    });

    return (
        <FooterBarStyled>&copy; Averbouch David 2021</FooterBarStyled>
    );
}

export default FooterBar;