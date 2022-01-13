import React from "react";
import Header from "../Header/Header";
import "./Home.css";
import { Row, Col, Container, Figure, Button, Stack } from "react-bootstrap";
import squadro_game from "../../assets/images/squadro_game.png";
import { useState } from "react";
import LocalGameModal from "./LocalGameModal";
import SingleGameModal from "./SingleGameModal";

const Home = () => {
  const [localGameModal, setLocalGameModal] = useState(false);
  const [singleGameModal, setSingleGameModal] = useState(false);

  return (
    <div className="home">
      <Header />
      <Container>
        <Row className="my-5 align-items-center">
          <Col lg="6" className="text-center">
            <p className="squadro-description mx-4">
              To win Squadro, you need to be the first player to make a return
              trip with four of your five pieces. Each player starts with their
              five pieces in troughs on their side of the game board, with
              players sitting perpendicular to one another. When you move a
              piece, you move it a distance based on the strength indicated in
              the trough that you're leaving. Once the piece has made its way
              across the board, you move it back based on the strength on the
              other side. If you pass over an opposing piece while moving, then
              that opposing piece must return to its last departing base and
              your moving piece advances one cell further than where the
              opposing piece was.
            </p>
          </Col>
          <Col lg="6" className="text-center">
            <Figure>
              <Figure.Image src={squadro_game} width={500} />
            </Figure>
          </Col>
        </Row>
        <Row>
          <Stack
            gap={5}
            direction="horizontal"
            className="col-md-5 my-5 mx-auto"
          >
            <Button
              className="btn-play"
              variant="dark"
              onClick={() => setLocalGameModal(true)}
            >
              Local Game
            </Button>
            <Button
              className="btn-play"
              variant="dark"
              onClick={() => setSingleGameModal(true)}
            >
              Single Game
            </Button>
          </Stack>
        </Row>
      </Container>
      <LocalGameModal
        isShown={localGameModal}
        handleClose={() => setLocalGameModal(false)}
      />
      <SingleGameModal
        isShown={singleGameModal}
        handleClose={() => setSingleGameModal(false)}
      />
    </div>
  );
};

export default Home;
