CREATE TABLE [dbo].[WidgetTable]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [col] INT NOT NULL, 
    [row] INT NOT NULL, 
    [sizeX] INT NOT NULL, 
    [sizeY] INT NOT NULL, 
    [refreshRate] INT NOT NULL DEFAULT 2, 
    [stocks] NVARCHAR(50) NULL, 
    [widgetType] NVARCHAR(50) NOT NULL
)
