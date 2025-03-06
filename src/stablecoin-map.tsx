// Create this file as CleanInteractiveConcordiumMap.tsx in your project

import React, { useState } from 'react';

// Define types for components and connections
interface Component {
  id: string;
  x: number;
  y: number;
  radius: number;
  label: string;
  name: string;
  layer: string;
  evolution: string;
  description: string;
}

interface Connection {
  from: string;
  to: string;
}

const CleanInteractiveConcordiumMap: React.FC = () => {
  const [hoveredComponent, setHoveredComponent] = useState<Component | null>(null);
  
  // Define the components with their positions and details
  const components: Component[] = [
    // Visible/User Need Layer
    {
      id: 'st',
      x: 700,
      y: 140,
      radius: 20,
      label: 'ST',
      name: 'Stablecoin Transactions',
      layer: 'User Need',
      evolution: 'Commodity',
      description: 'Sending and receiving stablecoins. This is the core user-facing activity and is positioned as a commodity because the concept is well understood across the industry.'
    },
    {
      id: 'pb',
      x: 600,
      y: 140,
      radius: 20,
      label: 'PB',
      name: 'Programmable Money',
      layer: 'User Need',
      evolution: 'Product',
      description: 'The ability for users to create programmable transactions with conditional execution based on defined triggers or time parameters.'
    },
    
    // Value Creation Layer
    {
      id: 'plt',
      x: 500,
      y: 240,
      radius: 20,
      label: 'PLT',
      name: 'Protocol Level Tokens',
      layer: 'Value Creation',
      evolution: 'Product',
      description: 'Concordium\'s approach to implementing stablecoins directly at the protocol level rather than via smart contracts, enhancing security and efficiency.'
    },
    {
      id: 'lm',
      x: 400,
      y: 240,
      radius: 20,
      label: 'LM',
      name: 'Lock Mechanisms',
      layer: 'Value Creation',
      evolution: 'Custom-Built',
      description: 'The capability to lock funds with various conditions for release, enabling escrow-like functionality without third parties holding the funds.'
    },
    {
      id: 'vb',
      x: 650,
      y: 240,
      radius: 18,
      label: 'V&B',
      name: 'Verify & Buy',
      layer: 'Value Creation',
      evolution: 'Product-Utility',
      description: 'One-click verification and payment functionality that combines identity verification and transaction execution in a seamless process.'
    },
    
    // Trust & Compliance Layer
    {
      id: 'id',
      x: 300,
      y: 340,
      radius: 20,
      label: 'ID',
      name: 'Identity Layer',
      layer: 'Trust & Compliance',
      evolution: 'Custom-Built',
      description: 'Concordium\'s core differentiator - the built-in identity layer that enables regulatory compliance while preserving privacy. This allows for accountability without sacrificing confidentiality.'
    },
    {
      id: 'zkp',
      x: 500,
      y: 340,
      radius: 18,
      label: 'ZKP',
      name: 'Zero-Knowledge Proofs',
      layer: 'Trust & Compliance',
      evolution: 'Product',
      description: 'Technology that enables proving statements about identity attributes without revealing the attributes themselves, maintaining privacy while satisfying regulatory requirements.'
    },
    {
      id: 'gf',
      x: 400,
      y: 340,
      radius: 18,
      label: 'GF',
      name: 'Geofencing',
      layer: 'Trust & Compliance',
      evolution: 'Custom-Built',
      description: 'Features that enable stablecoin issuers to restrict usage based on geographic location or jurisdictional requirements, ensuring compliance with regional regulations.'
    },
    
    // Enabling Infrastructure
    {
      id: 'sc',
      x: 500,
      y: 440,
      radius: 20,
      label: 'SC',
      name: 'Smart Contracts',
      layer: 'Enabling Infrastructure',
      evolution: 'Product',
      description: 'Programmable contracts that support the lock mechanisms and conditional execution. While smart contracts are an industry standard, Concordium uses them differently by not holding stablecoin value within them.'
    },
    {
      id: 'bft',
      x: 700,
      y: 440,
      radius: 20,
      label: 'BFT',
      name: 'Fork-Free Consensus',
      layer: 'Enabling Infrastructure',
      evolution: 'Utility',
      description: 'Concordium\'s Byzantine Fault Tolerance consensus mechanism that prevents blockchain forks, ensuring that transactions are final once confirmed and enhancing reliability for financial applications.'
    },
    
    // Foundation Layer
    {
      id: 'bp',
      x: 500,
      y: 540,
      radius: 20,
      label: 'BP',
      name: 'Blockchain Protocol',
      layer: 'Foundation',
      evolution: 'Product',
      description: 'The base Layer-1 blockchain protocol that provides the foundation for all other components. This includes the core ledger, transaction processing, and network communication.'
    }
  ];
  
  // Define connections between components
  const connections: Connection[] = [
    // User Need to Value Creation
    { from: 'st', to: 'plt' },
    { from: 'pb', to: 'lm' },
    { from: 'pb', to: 'vb' },
    
    // Value Creation to Trust & Compliance
    { from: 'plt', to: 'id' },
    { from: 'lm', to: 'gf' },
    { from: 'vb', to: 'zkp' },
    
    // Trust & Compliance to Enabling Infrastructure
    { from: 'id', to: 'sc' },
    { from: 'zkp', to: 'sc' },
    { from: 'gf', to: 'sc' },
    { from: 'id', to: 'bft' },
    
    // Enabling Infrastructure to Foundation
    { from: 'sc', to: 'bp' },
    { from: 'bft', to: 'bp' }
  ];
  
  // Function to find a component by ID - Fixed with type
  const findComponent = (id: string): Component | undefined => {
    return components.find(comp => comp.id === id);
  };
  
  // Function to determine color based on hovering state
  const getCircleColor = (component: Component): string => {
    const baseColor = '#3498db';
    if (hoveredComponent) {
      if (hoveredComponent.id === component.id) {
        return '#2980b9'; // Darker blue when hovered
      } else {
        // Check if this component is connected to the hovered one
        const isConnected = connections.some(
          conn => (conn.from === hoveredComponent.id && conn.to === component.id) || 
                 (conn.to === hoveredComponent.id && conn.from === component.id)
        );
        return isConnected ? '#2980b9' : '#a0cfee'; // Highlight if connected, fade if not
      }
    }
    return baseColor;
  };
  
  // Function to determine opacity based on hovering state
  const getCircleOpacity = (component: Component): number => {
    if (hoveredComponent) {
      if (hoveredComponent.id === component.id) {
        return 1;
      } else {
        const isConnected = connections.some(
          conn => (conn.from === hoveredComponent.id && conn.to === component.id) || 
                 (conn.to === hoveredComponent.id && conn.from === component.id)
        );
        return isConnected ? 0.9 : 0.4;
      }
    }
    return 0.8;
  };
  
  // Function to determine connection lines' styles
  const getLineStyles = (connection: Connection): {stroke: string; strokeOpacity: number; strokeWidth: number} => {
    if (!hoveredComponent) {
      return {
        stroke: '#3498db',
        strokeOpacity: 0.6,
        strokeWidth: 2
      };
    }
    
    const isHighlighted = 
      connection.from === hoveredComponent.id || 
      connection.to === hoveredComponent.id;
    
    return {
      stroke: isHighlighted ? '#2980b9' : '#a0cfee',
      strokeOpacity: isHighlighted ? 0.9 : 0.3,
      strokeWidth: isHighlighted ? 3 : 2
    };
  };

  // Using the proper handler function to avoid flickering 
  const handleMouseEnter = (component: Component): void => {
    setHoveredComponent(component);
  };

  const handleMouseLeave = (): void => {
    setHoveredComponent(null);
  };

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', fontFamily: 'Arial, sans-serif' }}>
      {/* Background */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#f8f9fa' }} />
      
      {/* SVG for the Wardley Map */}
      <svg width="800" height="600" style={{ position: 'absolute' }}>
        {/* Axes */}
        <line x1={100} y1={100} x2={100} y2={550} stroke="#333" strokeWidth={2} />
        <line x1={100} y1={550} x2={750} y2={550} stroke="#333" strokeWidth={2} />
        
        {/* X-axis labels */}
        <text x={150} y={580} fontSize={14} textAnchor="middle">Genesis</text>
        <text x={300} y={580} fontSize={14} textAnchor="middle">Custom-Built</text>
        <text x={500} y={580} fontSize={14} textAnchor="middle">Product</text>
        <text x={700} y={580} fontSize={14} textAnchor="middle">Commodity/Utility</text>
        
        {/* Y-axis labels */}
        <text x={80} y={130} fontSize={14} textAnchor="end">Visible/</text>
        <text x={80} y={150} fontSize={14} textAnchor="end">User Need</text>
        
        <text x={80} y={230} fontSize={14} textAnchor="end">Value Creation</text>
        
        <text x={80} y={330} fontSize={14} textAnchor="end">Trust &</text>
        <text x={80} y={350} fontSize={14} textAnchor="end">Compliance</text>
        
        <text x={80} y={430} fontSize={14} textAnchor="end">Enabling</text>
        <text x={80} y={450} fontSize={14} textAnchor="end">Infrastructure</text>
        
        <text x={80} y={530} fontSize={14} textAnchor="end">Foundation</text>
        
        {/* Evolution stage lines */}
        <line x1={200} y1={100} x2={200} y2={550} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        <line x1={400} y1={100} x2={400} y2={550} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        <line x1={600} y1={100} x2={600} y2={550} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        
        {/* Value chain horizontal lines */}
        <line x1={100} y1={200} x2={750} y2={200} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        <line x1={100} y1={300} x2={750} y2={300} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        <line x1={100} y1={400} x2={750} y2={400} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        <line x1={100} y1={500} x2={750} y2={500} stroke="#ccc" strokeWidth={1} strokeDasharray="5,5" />
        
        {/* Connecting lines */}
        {connections.map(connection => {
          const from = findComponent(connection.from);
          const to = findComponent(connection.to);
          
          if (!from || !to) return null;
          
          const styles = getLineStyles(connection);
          
          return (
            <line 
              key={`${connection.from}-${connection.to}`}
              x1={from.x} 
              y1={from.y} 
              x2={to.x} 
              y2={to.y} 
              stroke={styles.stroke}
              strokeWidth={styles.strokeWidth}
              strokeOpacity={styles.strokeOpacity}
            />
          );
        })}
        
        {/* Components */}
        {components.map(component => {
          // Calculate size without animation for stability
          const radius = hoveredComponent && hoveredComponent.id === component.id ? 
            component.radius * 1.2 : component.radius;
            
          return (
            <g 
              key={component.id}
              onMouseEnter={() => handleMouseEnter(component)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                cx={component.x} 
                cy={component.y} 
                r={radius} 
                fill={getCircleColor(component)}
                opacity={getCircleOpacity(component)}
              />
              <text 
                x={component.x} 
                y={component.y} 
                fontSize={12} 
                textAnchor="middle" 
                fill="white" 
                dominantBaseline="middle"
              >
                {component.label}
              </text>
            </g>
          );
        })}
        
        {/* Title */}
        <text x={400} y={50} fontSize={20} fontWeight="bold" textAnchor="middle">
          Concordium Stablecoin Infrastructure Wardley Map
        </text>
      </svg>
      
      {/* Tooltip */}
      {hoveredComponent && (
        <div style={{
          position: 'absolute',
          top: hoveredComponent.y > 300 ? hoveredComponent.y - 120 : hoveredComponent.y + 30,
          left: hoveredComponent.x > 400 ? hoveredComponent.x - 250 : hoveredComponent.x + 30,
          width: '280px',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          padding: '10px',
          border: '2px solid #3498db',
          zIndex: 1000,
          pointerEvents: 'none' // Prevents tooltip from triggering mouse events
        }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#3498db' }}>{hoveredComponent.name}</h3>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
            <strong>Layer:</strong> {hoveredComponent.layer} &nbsp;|&nbsp; 
            <strong>Evolution:</strong> {hoveredComponent.evolution}
          </p>
          <p style={{ margin: '0', fontSize: '0.9em' }}>{hoveredComponent.description}</p>
        </div>
      )}
    </div>
  );
};

export default CleanInteractiveConcordiumMap;