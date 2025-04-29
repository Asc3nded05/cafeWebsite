import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import bagelData from '../jsonFiles/bagelData.json';

export default function OptionMenuItem({ item }) {
  // Find the 'Type' option to use bagelData for choices
  const typeOption = item.options && item.options.find(opt => opt.name === 'Type');
  const bagelChoices = typeOption ? bagelData : [];

  return (
    <Card style={{ width: '18rem', height: 'auto' }}>
      <Card.Body>
        <Card.Title>{item.title} - ${typeof item.price === 'string' ? item.price.replace('$', '') : parseFloat(item.price.replace('$', '')).toFixed(2)}</Card.Title>
        <Form>
          {item.options && item.options.map((option, optionIdx) => (
            <div key={optionIdx} className="mb-2">
              <Card.Subtitle className="mb-2 text-muted">{option.name}</Card.Subtitle>
              {option.type === 'radio' && option.name === 'Type' && bagelChoices.map((choice, choiceIdx) => (
                <Form.Check
                  key={choiceIdx}
                  type="radio"
                  label={choice.label}
                  name={`${item.title}-${option.name}`}
                  value={choice.value}
                />
              ))}
              {option.type === 'checkbox' && option.name === 'Toasted' && option.choices.map((choice, choiceIdx) => (
                <Form.Check
                  key={choiceIdx}
                  type="checkbox"
                  label={choice.label}
                  name={`${item.title}-${option.name}-${choice.value}`}
                  value={choice.value}
                />
              ))}
              {/* You can add other form elements here as needed */}
            </div>
          ))}
          <Button variant="primary">Add to Order</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}


