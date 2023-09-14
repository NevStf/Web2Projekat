using AutoMapper;
using Microsoft.OpenApi.Models;
using Web2Projekat.Infrastructure.DBContext;
using Web2Projekat.Interfaces;
using Web2Projekat.Mapping;
using Web2Projekat.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SwaggerAPI", Version = "v1" });

});

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

builder.Services.AddScoped<IAuth, AuthService>();
builder.Services.AddScoped<IKorisnik, KorisnikService>();
builder.Services.AddScoped<IKorisnikRepository, KorisnikRepository>();

builder.Services.AddScoped<KorisniciDbContext>();
var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger API");
    });
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
