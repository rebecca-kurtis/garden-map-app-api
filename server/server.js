const express = require("express");
const cors = require("cors");
// const bcrypt = require("bcryptjs-react");
const bcrypt = require("bcrypt");

// load .env data into process.env
require("dotenv").config();
const dotenv = require("dotenv");
const db = require("../db/connection");

const app = express();

dotenv.config();
// app.use('/', express.static('public'))
app.use(cors());
app.use(express.json());

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

// Check if user owns plot
app.get("/checkUserRoute", (req, res) => {
  const plotID = req.query.plotID;
  const userID = req.query.userID;

  db.query(
    `
  SELECT CAST(
    EXISTS (
        SELECT 1
        FROM plots
        WHERE user_id = $1
          AND plot_id = $2
    ) AS BOOLEAN
  ) AS user_owns_plot;
  ;`,
    [userID, plotID],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
});

const bcryptComparePass = async (password, hash) => {

  // if (err) {
  //   console.log("err", err);
  // }
  console.log("function is triggered");
  console.log('pass in func', password);
  console.log('hash in func', hash);
  // try {
    const isMatch = await bcrypt.compare(password, hash);
    console.log("isMatch", isMatch) // returns true
    return isMatch;
  // } catch (e) {
  //   console.log(e)
  // }
}

// Login route
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const responseArr = [];
  let passwordStatus = "";

  db.query(
    "SELECT password FROM users WHERE username = $1",
    [username])
    .then((res) =>  {
      // if (err) {
      //   console.log("error is here1", err)
      //   throw err
      // }
      // else {
        const hash = res.rows[0].password;
        // const hash = String(res.rows[0].password);

        console.log("hash", hash);
        console.log("password", password);

        // bcryptComparePass(password, hash);


        bcrypt.compare(password, hash).then((result) => {
          console.log("in func", res.rows[0].password)
          console.log("in func", password)
        
              if(result){
                  console.log("login success");
                  console.log(result);

                  // response.user=user
                  // response.status=true
                  // resolve(response)

              }else{
                  console.log('login failed');
                  // resolve({status:false})
              }
          })
      // }else{
      //     console.log("login falied")
      // //     resolve({status: false})
      // }
  // })

        // // compare hash and password
        // // console.log("bycrypt", bcrypt.compare);

        // async function passwordCheck() {
        //   // Load hash from your password DB.
        //   const result1 = await bcrypt.compare(password, hash);
        //   // result1 == true

        //   console.log("result", result1);

        // }

        // passwordCheck();

   

        // bcrypt.compare(password, hash)
        //   .then((result) =>{
        //   // execute code to test for access and login
        //     console.log("bcrypt response", result);
        //   if (err) throw err;

        //   if (result) {
        //     passwordStatus = true;
        //   } else {
        //     passwordStatus = false;
        //   }
        // });
        // console.log("passwordStatus", passwordStatus);
        // return passwordStatus;
      })
    .then((result) => {
      if (result === true) {
        const userResponse = db.query(
          "SELECT user_id FROM users WHERE username = $1;",
          [username]
        );
        return userResponse;
      } else {
        res.status(404);
        console.log("result was false")
      }
    })
    .then((response) => {
      responseArr.push(response.rows);
      res.status(200).send(responseArr);
    })
    .catch((error) => {
      console.log("error:", error);
      if (error) {
        throw error;
      }
    });
});




// Login route
app.post("/updateLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userID = req.body.user_id;

  db.query(
    `UPDATE users
    SET username = $1, password = $2
    WHERE user_id = $3
    ;`,
    [username, password, userID]
  )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log("error:", error);
      if (error) {
        throw error;
      }
    });
});

// Get all tips
app.get("/tips", (req, res) => {
  db.query("SELECT * FROM tips", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

// Get all plots/id
app.get("/plots/:id", (req, res) => {
  const plotId = req.params.id;
  const responseArr = [];

  db.query(
    `SELECT DISTINCT
    users.user_id AS user_id, 
    tips.tips_id AS tip_id, 
    users.first_name AS fName,
    users.last_name AS lName,
    users.description AS uDescription,
    tips.description AS tDescription,
    plantedPlants.plant_id AS ppPlantId
    FROM users
    JOIN plots on users.user_id = plots.user_id
    JOIN plantedPlants on plots.plot_id = plantedPlants.plot_id
    JOIN tips on users.user_id = tips.user_id
    WHERE plots.plot_id = $1
    AND tips.user_id = users.user_id 
    GROUP BY users.user_id, uDescription, ppPlantId, tDescription, tips.user_id, tips.tips_id
    ORDER BY user_id, tip_id;`,
    [plotId]
  )
    .then((response) => {
      responseArr.push({ profileInfo: response.rows });
      const photosResponse = db.query(
        "SELECT * FROM photos WHERE plot_id = $1;",
        [plotId]
      );
      return photosResponse;
    })
    .then((response) => {
      responseArr.push({ photosInfo: response.rows });
      res.status(200).send(responseArr);
    })
    .catch((error) => {
      console.log("error:", error);
      if (error) {
        throw error;
      }
    });
});

// Get all plants
app.get("/plants", (req, res) => {
  db.query("SELECT * FROM plants", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

// Get all gardens
app.get("/gardens", (req, res) => {
  db.query("SELECT * FROM gardens", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

// Get all plots
app.get("/plots", (req, res) => {
  db.query("SELECT * FROM plots", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

// Get all plantedPlants
app.get("/plantedPlants", (req, res) => {
  db.query("SELECT * FROM plantedPlants", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
});

//update About Section "/updateAbout"
app.post("/updateAbout", (req, res) => {
  const userID = req.body.userID;
  const description = req.body.description;

  db.query(
    `
  UPDATE users
  SET description = $1
  WHERE user_id = $2
  ;`,
    [description, userID],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
});

//update HeroHeader Section Name "/updateName"
app.post("/updateName", (req, res) => {
  const userID = req.body.userID;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;

  db.query(
    `
  UPDATE users
  SET first_name = $1, last_name = $2
  WHERE user_id = $3
  ;`,
    [firstName, lastName, userID],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
});

//add new tip to database
app.post("/addTip", (req, res) => {
  const userID = req.body.userID;
  let tipDescription = req.body.description;

  db.query(
    `
 INSERT INTO tips (user_id, description)
 VALUES ($1, $2)
  ;`,
    [userID, tipDescription]
  )
    .then(() => {
      newTips = db.query(
        `
    SELECT DISTINCT
    tips.tips_id AS tip_id,
    tips.description AS tDescription
    FROM tips
    WHERE tips.user_id = $1
    ;`,
        [userID]
      );
      return newTips;
    })
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
});

//update Tips Section "/updateTips"
app.post("/updateTips", (req, res) => {
  let tipId = "";
  let tipDescription = "";

  for (let tip in req.body) {
    tipId = tip;
    tipDescription = req.body[tip];
  }

  db.query(
    `
  UPDATE tips
  SET description = $1
  WHERE tips_id = $2
  ;`,
    [tipDescription, tipId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
});

//delete Tip
app.post("/deleteTip", (req, res) => {
  let deleteValue = req.body.deleteValue;
  const userID = req.body.userID;

  db.query(
    `
  DELETE FROM tips
  WHERE tips_id = $1
  ;`,
    [deleteValue]
  )
    .then(() => {
      newTips = db.query(
        `
    SELECT DISTINCT
    tips.tips_id AS tip_id,
    tips.description AS tDescription
    FROM tips
    WHERE tips.user_id = $1
    ;`,
        [userID]
      );
      return newTips;
    })
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
});

//delete plantedPlants item
app.post("/deletePlantedPlant", (req, res) => {
  let deleteValue = req.body.deleteValue;
  const plotID = req.body.plotID;

  db.query(
    `
  DELETE FROM plantedPlants
  WHERE plantedPlants_id = $1
  ;`,
    [deleteValue]
  )
    .then(() => {
      allPlantedPlants = db.query(
        `
    SELECT *
    FROM plantedPlants
    WHERE plantedPlants.plot_id = $1
    ;`,
        [plotID]
      );
      return allPlantedPlants;
    })
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
});

//add new Planted Plant item with already created plants
app.post("/addPlant", (req, res) => {
  const plantName = req.body.name;
  const plotID = req.body.plotID;

  db.query(
    `
  SELECT plant_id
  FROM plants
  WHERE name = $1
  ;`,
    [plantName]
  )
    .then((response) => {
      const plantID = response.rows[0].plant_id;
      return db.query(
        `
    INSERT INTO plantedPlants (plot_id, plant_id)
    VALUES ($1, $2)
    ;`,
        [plotID, plantID]
      );
    })
    .then((results) => {
      allPlantedPlants = db.query(
        `
    SELECT *
    FROM plantedPlants
    WHERE plantedPlants.plot_id = $1
    ;`,
        [plotID]
      );
      return allPlantedPlants;
    })
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
});

//create new plant and add to plantedPants
app.post("/createPlant", (req, res) => {
  const plantName = req.body.name;
  const plotID = req.body.plotID;

  db.query(
    `
  INSERT INTO plants (name)
    VALUES ($1)
    RETURNING plant_id
  ;`,
    [plantName]
  )
    .then((response) => {
      const plantID = response.rows[0].plant_id;
      return db.query(
        `
    INSERT INTO plantedPlants (plot_id, plant_id)
    VALUES ($1, $2)
    RETURNING plantedPlants_id
    ;`,
        [plotID, plantID]
      );
    })
    .then((results) => {
      allPlantedPlants = db.query(
        `
    SELECT *
    FROM plantedPlants
    WHERE plantedPlants.plot_id = $1
    ;`,
        [plotID]
      );
      return allPlantedPlants;
    })
    .then((results) => {
      res.status(200).send(results.rows);
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
