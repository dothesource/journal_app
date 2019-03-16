import React from 'react'
import Card, {
  CardActions,
  CardActionIcons,
  CardPrimaryContent
} from '@material/react-card'
import '@material/react-card/dist/card.css'

const Entry = ({ entry, deleteEntry }) => (
  <Card className="card">
    <CardPrimaryContent>
      <p>{entry.text}</p>
    </CardPrimaryContent>
    <CardActions>
      <CardActionIcons>
        <i onClick={() => deleteEntry(entry)} className="material-icons">
          delete
        </i>
      </CardActionIcons>
    </CardActions>
  </Card>
)

export default Entry
