import { Button, IconButton } from "../src";
import { Announcement } from "./announcement";

export default {
  title: "WIP/Knappgrupp",
  component: Button,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Knappgrupp = () => (
  <div className="space-y-4">

    <div>
      <Button.Group variant="solid" color="primary" className="space-x-2">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" color="orange" className="space-x-2">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </div>

    <div>
      <Button.Group variant="solid" color="primary" className="space-x-2">
        <IconButton>
          <Announcement size={16} />
        </IconButton>

        <IconButton>
          <Announcement size={16} />
        </IconButton>

        <IconButton>
          <Announcement size={16} />
        </IconButton>

        <IconButton>
          <Announcement size={16} />
        </IconButton>
      </Button.Group>
    </div>
  </div>
);

export const Fastsittandes = () => (
    <div className="space-y-4">
      <div>
        <Button.Group variant="solid" attached>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Button.Group>
      </div>

      <div>
        <Button.Group variant="solid" size="lg" attached>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Button.Group>
      </div>      

      <div>
        <Button.Group variant="solid" color="primary" attached>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Button.Group>
      </div>

      <div>
        <Button.Group variant="solid" attached>
          <Button>Button</Button>
          <Button color="primary">Button</Button>
          <Button color="secondary">Button</Button>
          <Button>Button</Button>
        </Button.Group>
      </div>  
  
      <div>
        <Button.Group variant="solid" attached>
          <IconButton>
            <Announcement size={16} />
          </IconButton>
  
          <IconButton>
            <Announcement size={16} />
          </IconButton>
  
          <IconButton>
            <Announcement size={16} />
          </IconButton>
  
          <IconButton>
            <Announcement size={16} />
          </IconButton>
        </Button.Group>
      </div>

      <div>
        <Button.Group variant="solid" attached>
          <IconButton>
            <Announcement size={32} />
          </IconButton>
  
          <IconButton>
            <Announcement size={32} />
          </IconButton>
  
          <IconButton>
            <Announcement size={32} />
          </IconButton>
  
          <IconButton>
            <Announcement size={32} />
          </IconButton>
        </Button.Group>
      </div>
  
    </div>
  );
